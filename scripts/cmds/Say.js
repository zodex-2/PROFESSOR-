// commands/say.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "say",
    aliases: ["voice", "speak"],
    version: "1.0",
    author: "Rionto",
    countDown: 5,
    role: 0,
    shortDescription: "Convert text to voice",
    longDescription: "Bot will convert your text into voice (TTS) and send as audio",
    category: "fun",
    guide: {
      en: "{p}say <text>"
    }
  },

  onStart: async function ({ api, event, args }) {
    if (args.length === 0) {
      return api.sendMessage("❌ Please provide some text!", event.threadID, event.messageID);
    }

    const text = args.join(" ");
    const lang = "bn"; // 👉 'bn' = বাংলা ভয়েস, 'en' = ইংরেজি ভয়েস
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;

    const filePath = path.join(__dirname, "say-voice.mp3");

    try {
      const response = await axios({
        url,
        method: "GET",
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, response.data);

      api.sendMessage(
        { attachment: fs.createReadStream(filePath) },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Failed to generate voice.", event.threadID, event.messageID);
    }
  }
};
