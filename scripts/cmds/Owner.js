module.exports = {
  config: {
    name: "Rionto",
    aliases: ["creator", "admin", "boss","vaai"],
    version: "1.2",
    author: "RIONTO",
    role: 0,
    shortDescription: "Show bot owner details",
    longDescription: "Display information about the bot owner",
    category: "info",
    guide: "{pn}owner"
  },

  onStart: async function ({ message }) {
    const ownerInfo = `
✨━━━━━━━━━━━━━━━━━━✨
        👑 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 👑
✨━━━━━━━━━━━━━━━━━━✨

🧑‍💻 Name        : RIONTO💤
🆔 UID         : 61579681084940
📍 Location    : Rajshahi 😶‍🌫️
📧 Email       : mutasimfahimrionto@gmail.com
📱 WhatsApp    : 01611964206
💖 Relationship: In Relationship with jerinn/pegu😌

✨━━━━━━━━━━━━━━━━━━✨
🤖 𝗕𝗢𝗧 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
✨━━━━━━━━━━━━━━━━━━✨

🔰 Bot Name    : NTKhang
🛠 Framework   : GoatBot V2
⚡ Version     : 2.x
📌 Prefix       :, 



✨━━━━━━━━━━━━━━━━━━✨
`;

    // Send the owner info
    message.reply(ownerInfo);
  }
};
