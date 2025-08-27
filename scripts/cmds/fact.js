// commands/facts.js
module.exports = {
  config: {
    name: "fact",
    aliases: ["facts", "randomfact"],
    version: "1.1",
    author: "Rionto",
    countDown: 3, // প্রতি কমান্ড ইউজের মাঝে ৩ সেকেন্ড গ্যাপ
    role: 0, // 0 = সাধারণ ইউজার, 1 = group admin, 2 = bot admin
    shortDescription: "Random fun fact",
    longDescription: "প্রতিবার আলাদা আলাদা মজার তথ্য পাঠাবে।",
    category: "fun",
    guide: {
      en: "{pn} → একটি র‍্যান্ডম তথ্য পেতে\nউদাহরণ: {pn}"
    }
  },

  onStart: async function ({ message }) {
    try {
      const facts = [
        "মধু কখনও নষ্ট হয় না। হাজার বছর পুরনো মধুও খাওয়া যায়।",
        "একটি অক্টোপাসের ৩টি হৃদপিণ্ড থাকে।",
        "শুক্র গ্রহে একটি দিন একটি বছরের থেকেও বড়।",
        "কলা আসলে একটি বেরি, কিন্তু স্ট্রবেরি নয়!",
        "পিঁপড়ারা কখনও ঘুমায় না।",
        "হাঙরের দাঁত পড়ে গেলে নতুন দাঁত গজায়।",
        "তিমিরা একে অপরের সাথে গান গেয়ে যোগাযোগ করে।",
        "শিশুরা জন্মের সময় প্রায় ৩০০ হাড় নিয়ে জন্মায়, কিন্তু বড় হলে তা ২০৬ টিতে মিলে যায়।",
        "বিড়ালরা দিনে গড়ে ১২–১৬ ঘণ্টা ঘুমায়।",
        "মানবদেহের সবচেয়ে শক্তিশালী পেশী হলো জিহ্বা।"
      ];

      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      await message.reply("📌 আজকের মজার তথ্য:\n\n" + randomFact);
    } catch (err) {
      console.error("Fact command error:", err);
      await message.reply("❌ কিছু সমস্যা হয়েছে, পরে চেষ্টা করুন।");
    }
  }
};
