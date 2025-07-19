const os = require("os");
const { createCanvas, registerFont } = require("canvas");
const pidusage = require("pidusage");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

// Optional: register a modern font (put .ttf in same folder or use system font)
try {
  registerFont(path.join(__dirname, "Poppins-SemiBold.ttf"), { family: "Poppins" });
} catch (e) {
  // fallback to default font if custom font fails
}

module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt", "status"],
    version: "3.5",
    author: "X Nil",
    role: 0,
    shortDescription: "Show stylish uptime image",
    longDescription: "Generates a clean and modern system/bot status image with design",
    category: "system",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    const uptime = process.uptime();
    const sysUptime = os.uptime();
    const usage = await pidusage(process.pid);
    const totalMem = os.totalmem() / 1024 / 1024;
    const usedMem = process.memoryUsage().rss / 1024 / 1024;
    const cpu = os.cpus()[0].model;
    const core = os.cpus().length;
    const platform = os.platform();
    const hostname = os.hostname();
    const arch = os.arch();

    const formatTime = (s) => {
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = Math.floor(s % 60);
      return `${h}h ${m}m ${sec}s`;
    };

    const width = 800;
    const height = 510;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background Gradient
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#1a1b2f");
    bg.addColorStop(1, "#151622");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = "#00ffc3";
    ctx.font = "bold 34px Poppins, Arial";
    ctx.fillText("🤖 BOT STATUS", 40, 60);

    // Stylish Box draw
    const drawBox = (y, icon, label, value) => {
      ctx.fillStyle = "#2c2f3f";
      ctx.roundRect(40, y, 720, 50, 12).fill();

      ctx.fillStyle = "#00ffe6";
      ctx.font = "bold 20px Poppins, Arial";
      ctx.fillText(`${icon} ${label}`, 55, y + 32);

      ctx.fillStyle = "#ffffff";
      ctx.font = "18px Poppins, Arial";
      ctx.fillText(value, 300, y + 32);
    };

    // Monkey patch roundRect if not native
    if (!ctx.roundRect) {
      ctx.__proto__.roundRect = function (x, y, w, h, r) {
        if (typeof r === "number") r = { tl: r, tr: r, br: r, bl: r };
        else {
          var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
          for (var side in defaultRadius) r[side] = r[side] || defaultRadius[side];
        }
        this.beginPath();
        this.moveTo(x + r.tl, y);
        this.lineTo(x + w - r.tr, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r.tr);
        this.lineTo(x + w, y + h - r.br);
        this.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
        this.lineTo(x + r.bl, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r.bl);
        this.lineTo(x, y + r.tl);
        this.quadraticCurveTo(x, y, x + r.tl, y);
        this.closePath();
        return this;
      };
    }

    let boxY = 100;
    const gap = 60;

    drawBox(boxY, "⏱", "Bot Uptime", formatTime(uptime));
    drawBox(boxY += gap, "🖥", "System Uptime", formatTime(sysUptime));
    drawBox(boxY += gap, "💾", "RAM Usage", `${usedMem.toFixed(1)} / ${totalMem.toFixed(1)} MB`);
    drawBox(boxY += gap, "⚙", "CPU Info", `${cpu} (${core} cores)`);
    drawBox(boxY += gap, "📈", "CPU Usage", `${usage.cpu.toFixed(1)}%`);
    drawBox(boxY += gap, "💻", "Platform", `${platform} (${arch}) | ${hostname}`);

    // Footer Time
    ctx.fillStyle = "#888";
    ctx.font = "16px Poppins, Arial";
    ctx.fillText(`🕓 ${moment().format("YYYY-MM-DD HH:mm:ss")}`, 40, height - 20);

    // Output
    const buffer = canvas.toBuffer("image/png");
    const imagePath = path.join(__dirname, "uptime_modern.png");
    fs.writeFileSync(imagePath, buffer);

    return api.sendMessage({
      body: "📊 Modern Uptime Status",
      attachment: fs.createReadStream(imagePath)
    }, event.threadID, () => fs.unlinkSync(imagePath), event.messageID);
  }
};