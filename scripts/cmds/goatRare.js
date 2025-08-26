// 🐐 goatRare.js – Goat Bot V2 er jonno ekta unique command

module.exports = {
  name: 'goatrare',
  description: '🐐 Ekta rare fact paben!',
  permission: 'user', // 'admin' hole sudhu admin-i use korte parbe

  execute: async (message) => {
    const facts = [
      '🪐 Venus er ek din er cheye tar ek bochor beshi.',
      '🐐 Goat der chokhe rectangular pupils thake!',
      '🌌 Brishti porey na, kintu universe-e 100 billion galaxy ache.',
      '🎨 Manush je sob rong dekhe, goat o dekhe.',
      '🧬 Manush ar banana er DNA 50% mil.',
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    message.reply({
      body: `🐐 Rare Fact: ${randomFact}`,
      mentions: true, // User ke mention korbe
    });
  },
};
