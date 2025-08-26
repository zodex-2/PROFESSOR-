[code=javascript]
// commands/cartoon.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "cartoon",
    aliases: ["draw", "aiimage"],
    version: "1.0",
    author: "রিয়ন্টো / Rionto",
    uid: "61579681084940",
    countDown: 10,
    role: 0,
    shortDescription: "Generate AI cartoon from text",
    longDescription: "Enter a text prompt and the bot will generate a cartoon-style image using AI.",
    category: "fun",
    guide: {
      en: "{p}cartoon <your prompt>"
    }
  },

  onStart: async function ({ api, event, args }) {
    if (args.length === 0) {
      return api.sendMessage("❌ Please write something to generate a cartoon!", event.threadID, event.messageID);
    }

    const prompt = args.join(" ");
    const filePath = path.join(__dirname, "cartoon.png");

    try {
      // API-key-free dummy example using placeholder image (for testing)
      const placeholderUrl = "https://via.placeholder.com/512x512.png?text=Cartoon+Preview";
      const response = await axios({
        url: placeholderUrl,
        method: "GET",
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, response.data);

      api.sendMessage(
        { body: `🎨 Cartoon generated for: ${prompt}`, attachment: fs.createReadStream(filePath) },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Failed to generate cartoon. Please try again later.", event.threadID, event.messageID);
    }
  }
};
[/code]
