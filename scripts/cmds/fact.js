// commands/facts.js
module.exports = {
  config: {
    name: "fact",
    aliases: ["facts", "randomfact"],
    version: "1.0",
    author: "Your Name",
    shortDescription: "Send a random fun fact",
    longDescription: "প্রতিবার ভিন্ন ভিন্ন random fun fact পাঠাবে",
    category: "fun",
  },

  onStart: async function ({ message }) {
    const facts = [
      "মধু কখনও নষ্ট হয় না। হাজার বছর পুরনো মধুও খাওয়া যায়।",
      "একটি অক্টোপাসের ৩টি হৃদপিণ্ড থাকে।",
      "শুক্র গ্রহে একটি দিন একটি বছরের থেকেও বড়।",
      "কলা আসলে একটি বেরি, কিন্তু স্ট্রবেরি নয়!",
      "পিঁপড়ারা কখনও ঘুমায় না।",
      "হাঙরের দাঁত পড়ে গেলে নতুন দাঁত গজায়।"
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    message.reply("📌 আজকের মজার তথ্য:\n\n" + randomFact);
  }
};
