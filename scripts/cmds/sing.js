// /scrip/cmd/sing.js
module.exports = {
  config: {
    name: "sing",
    aliases: ["song", "music"],
    version: "1.0",
    author: "YourName",
    role: 0, // 0 = all users, 2 = admin only
    description: "Bot sings a random song lyric",
    usage: ",sing"
  },

  run: async ({ message, args, reply }) => {
    // Random song lyrics
    const songs = [
      "Twinkle, twinkle, little star, How I wonder what you are!",
      "Row, row, row your boat, Gently down the stream!",
      "Happy birthday to you, Happy birthday to you!",
      "Jingle bells, jingle bells, Jingle all the way!"
    ];

    // Pick a random song
    const lyric = songs[Math.floor(Math.random() * songs.length)];

    // Send message
    reply(lyric);
  }
};
