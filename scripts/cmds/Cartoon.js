// commands/cartoon.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "cartoon",
    aliases: ["draw", "aiimage"],
    version: "1.0",
    author: "রিয়ন্টো / Rionto", // ✅ বাংলা + English Author
    uid: "61579681084940",       // ✅ English UID
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
      // এখানে HuggingFace API ব্যবহার হচ্ছে (তুমি চাইলে অন্য API key বসাতে পারো)
      const response = await axios({
        url: "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        method: "POST",
        headers: { "Authorization": "Bearer hf_your_api_key_here" }, // 👉 নিজের HuggingFace API key বসাও
        data: { inputs: prompt },
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
