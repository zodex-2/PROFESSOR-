const { MessageAttachment, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "RIO",
    aliases: ["creator", "admin"],
    description: "Shows bot owner details with video",
    usage: ",owner",
    category: "info",
  },

  run: async (bot, message, args) => {
    try {
      // File paths
      const videoPath = path.join(__dirname, "../../assets/video.mp4");
      const logoPath = path.join(__dirname, "../../assets/logo.png");

      // Create attachments
      const videoAttachment = new MessageAttachment(videoPath);
      const logoAttachment = new MessageAttachment(logoPath);

      // Embed
      const embed = new EmbedBuilder()
        .setTitle("💎 Bot Owner Details")
        .setDescription(`
**Name    :** Rionto  
**Location:** Bangladesh,RAJSHAHI 😶‍🌫️
**Email   :** mutasimfahimrionto@gmail.com 
**WhatsApp:** 01611964206
**Relationship Status:** wifeyy Jerin/pegu 💖
        `)
        .setThumbnail("attachment://logo.png")
        .setColor("#ff69b4")
        .setFooter({ text: "Contact the owner for more info!" });

      // Send embed + files
      await message.channel.send({ 
        embeds: [embed],
        files : []
      });

    } catch (err) {
      console.error(err);
      message.reply("কিছু সমস্যা হয়েছে।");
    }
  }
};
