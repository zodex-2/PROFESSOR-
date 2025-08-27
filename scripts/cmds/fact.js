// commands/facts.js
module.exports = {
  config: {
    name: "fact",
    aliases: ["facts", "randomfact"],
    version: "1.1",
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
      "হাঙরের দাঁত পড়ে গেলে নতুন দাঁত গজায়।",
      "তিমিরা একে অপরের সাথে গান গেয়ে যোগাযোগ করে।",
      "শিশুরা জন্মের সময় প্রায় ৩০০ হাড় নিয়ে জন্মায়, কিন্তু বড় হলে তা ২০৬ টিতে মিলে যায়।",
      "বিড়ালরা দিনে গড়ে ১২–১৬ ঘণ্টা ঘুমায়।",
      "মানবদেহের সবচেয়ে শক্তিশালী পেশী হলো জিহ্বা।"
    ];

    // প্রতিবার আলাদা fact বেছে নেওয়া
    const randomIndex = Math.floor(Math.random() * facts.length);
    const randomFact = facts[randomIndex];

    message.reply("📌 আজকের মজার তথ্য:\n\n" + randomFact);
  }
};
