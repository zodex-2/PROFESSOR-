,cmd install say.js2 // say.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "say",
    aliases: ["voice", "speak"],
    version: "1.1",
    author: "Rionto",
    countDown: 5,
    role: 0,
    shortDescription: "Say text with voice",
    longDescription: "Convert text to speech and send as voice message",
    category: "fun",
    guide: {
      en: "{p}say <text>"
    }
  },

  onStart: async function ({ api, event, args }) {
    if (args.length === 0) {
      return api.sendMessage("❌ Please provide text!", event.threadID, event.messageID);
    }

    const text = args.join(" ");
    const lang = "en"; // চাইলে 'bn' দিলে বাংলা ভয়েস হবে
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;

    const filePath = path.join(__dirname, "say.mp3");

    try {
      const response = await axios({
        url,
        method: "GET",
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, response.data);

      api.sendMessage({
        body: `🔊 ${text}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Failed to generate voice.", event.threadID, event.messageID);
    }
  }
};
