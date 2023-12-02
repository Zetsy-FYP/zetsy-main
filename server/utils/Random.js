const crypto = require('crypto');

function generateRandomCombo() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let combo = '';

  for (let i = 0; i < 5; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    combo += characters.charAt(randomIndex);
  }

  return combo;
}

module.exports = {generateRandomCombo}