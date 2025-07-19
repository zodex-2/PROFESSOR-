const createFuncMessage = global.utils.message;
const handlerCheckDB = require("./handlerCheckData.js");
const request = require("request");
const axios = require("axios");
const fs = require("fs-extra");

// Store pinned messages in a global object
const pinnedMessages = {};
const spamCount = {};

module.exports = (
  api,
  threadModel,
  userModel,
  dashBoardModel,
  globalModel,
  usersData,
  threadsData,
  dashBoardData,
  globalData
) => {
  const handlerEvents = require(process.env.NODE_ENV === "development"
    ? "./handlerEvents.dev.js"
    : "./handlerEvents.js")(
    api,
    threadModel,
    userModel,
    dashBoardModel,
    globalModel,
    usersData,
    threadsData,
    dashBoardData,
    globalData
  );

  return async function (event) {
    const message = createFuncMessage(api, event);
    await handlerCheckDB(usersData, threadsData, event);
    const handlerChat = await handlerEvents(event, message);
    if (!handlerChat) return;

    const {
      onStart,
      onChat,
      onReply,
      onEvent,
      handlerEvent,
      onReaction,
      typ,
      presence,
      read_receipt,
    } = handlerChat;

    // Enhanced Message pinning system
    if (event.type === "message") {
      if (event.body.toLowerCase() === "!pin" && event.messageReply) {
        try {
          pinnedMessages[event.threadID] = {
            messageID: event.messageReply.messageID,
            senderID: event.messageReply.senderID,
            body: event.messageReply.body || "[Attachment]",
            attachments: event.messageReply.attachments || []
          };
          
          // Use the pinMessage function with pinMode = true
          api.pinMessage(true, event.messageReply.messageID, event.threadID, (err) => {
            if (err) {
              console.error("Error pinning message:", err);
              message.send("❌ Failed to pin message. Please try again.");
              return;
            }
            message.send("📌 Message pinned successfully!");
          });
        } catch (error) {
          console.error("Error in pin command:", error);
          message.send("❌ Failed to pin message. Please try again.");
        }
      }
      else if (event.body.toLowerCase() === "!unpin") {
        if (pinnedMessages[event.threadID]) {
          try {
            // Use the pinMessage function with pinMode = false to unpin
            api.pinMessage(false, pinnedMessages[event.threadID].messageID, event.threadID, (err) => {
              if (err) {
                console.error("Error unpinning message:", err);
                message.send("❌ Failed to unpin message. Please try again.");
                return;
              }
              delete pinnedMessages[event.threadID];
              message.send("📌 Message unpinned successfully!");
            });
          } catch (error) {
            console.error("Error in unpin command:", error);
            message.send("❌ Failed to unpin message. Please try again.");
          }
        } else {
          message.send("ℹ️ No message is currently pinned in this thread.");
        }
      }
      else if (event.body.toLowerCase() === "!pinned") {
        if (pinnedMessages[event.threadID]) {
          try {
            const pinnedMsg = pinnedMessages[event.threadID];
            const senderName = await usersData.getName(pinnedMsg.senderID);
            
            // Handle attachments if any
            const attachments = [];
            for (const attachment of pinnedMsg.attachments) {
              try {
                const stream = await global.utils.getStreamFromURL(attachment.url);
                attachments.push(stream);
              } catch (e) {
                console.error("Error getting attachment:", e);
              }
            }
            
            message.send({
              body: `📌 Pinned Message:\n\nFrom: ${senderName}\nContent: ${pinnedMsg.body}`,
              mentions: [{ id: pinnedMsg.senderID, tag: senderName }],
              attachment: attachments
            });
          } catch (error) {
            console.error("Error showing pinned message:", error);
            message.send("❌ Failed to retrieve pinned message.");
          }
        } else {
          message.send("ℹ️ No message is currently pinned in this thread.");
        }
      }
    }

    switch (event.type) {
      case "message":
      case "message_reply":
      case "message_unsend":
        try {
          await onChat();
          await onStart();
          await onReply();
        } catch (err) {
          console.error("Error in message handlers:", err);
        }

        // Handle resend
        if (
          event.type === "message_unsend" &&
          global.reSend &&
          global.reSend[event.threadID] &&
          Array.isArray(global.reSend[event.threadID])
        ) {
          const resendEnabled = await threadsData.get(event.threadID, "settings.reSend");
          if (resendEnabled && event.senderID !== api.getCurrentUserID()) {
            const index = global.reSend[event.threadID].findIndex(
              (e) => e.messageID === event.messageID
            );

            if (index > -1) {
              const deletedMsg = global.reSend[event.threadID][index];
              const senderName = await usersData.getName(event.senderID);
              const attachments = [];

              for (let i = 0; i < deletedMsg.attachments.length; i++) {
                const att = deletedMsg.attachments[i];
                try {
                  if (att.type === "audio") {
                    const filePath = `scripts/cmds/tmp/${i + 1}.mp3`;
                    const res = await axios.get(att.url, { responseType: "arraybuffer" });
                    fs.writeFileSync(filePath, Buffer.from(res.data, "utf-8"));
                    attachments.push(fs.createReadStream(filePath));

                    // Delete file after 60 sec (optional cleanup)
                    setTimeout(() => fs.unlink(filePath).catch(() => {}), 60 * 1000);
                  } else {
                    attachments.push(await global.utils.getStreamFromURL(att.url));
                  }
                } catch (e) {
                  console.error("Attachment handling error:", e);
                }
              }

              api.sendMessage(
                {
                  body: `${senderName} removed:\n\n${deletedMsg.body}`,
                  mentions: [{ id: event.senderID, tag: senderName }],
                  attachment: attachments,
                },
                event.threadID
              );
            }
          }
        }
        break;

      case "message_reaction":
        try {
          await onReaction();

          if (event.reaction === "☠️") {
            if (event.userID === "100001986888287") {
              api.removeUserFromGroup(event.senderID, event.threadID, (err) => {
                if (err) console.log("Failed to remove user:", err);
              });
            } else {
              message.send(":)");
            }
          }

          if (event.reaction === "🤍") {
            if (event.senderID === api.getCurrentUserID()) {
              if (event.userID === "100001986888287") {
                message.unsend(event.messageID);
              } else {
                message.send(":)");
              }
            }
          }
        } catch (e) {
          console.error("Reaction handler error:", e);
        }
        break;

      case "typ":
        try {
          await typ();
        } catch (e) {
          console.error("typ() error:", e);
        }
        break;

      case "presence":
        try {
          await presence();
        } catch (e) {
          console.error("presence() error:", e);
        }
        break;

      case "read_receipt":
        try {
          await read_receipt();
        } catch (e) {
          console.error("read_receipt() error:", e);
        }
        break;

      default:
        break;
    }
  };
};
