module.exports = {
  config: {
    name: "private",
    version: "1.0",
    author: "Rionto",
    countDown: 5,
    role: 2,
    shortDescription: "Make bot private",
    longDescription: "শুধুমাত্র নির্দিষ্ট Admin ID ছাড়া কেউ এই বট ব্যবহার করতে পারবে না।",
    category: "system",
  },

  // --- যেসব ID বট ব্যবহার করতে পারবে (তোমার নিজের FB ID দাও এখানে) ---
  allowIds: ["61579681084940"],

  onLoad: function ({ api }) {
    const allowed = this.allowIds;
    api.listenMqtt(async (err, event) => {
      if (err) return console.error(err);
      if (!event.body) return;

      // যদি sender allowed না হয় → block
      if (!allowed.includes(event.senderID)) {
        return api.sendMessage("❌ এই Bot Private. তুমি ব্যবহার করতে পারবে না।", event.threadID);
      }
    });
  },

  onStart: async function ({ message }) {
    await message.reply("✅ Private system enabled. এখন শুধুমাত্র owner বট চালাতে পারবে।");
  }
};
