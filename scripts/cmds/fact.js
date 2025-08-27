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
