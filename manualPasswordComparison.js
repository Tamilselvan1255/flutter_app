// manualPasswordComparison.js
const bcrypt = require('bcrypt');

const inputPassword = 'securePassword';  // Replace with your input password
const hashedPasswordFromDB = '$2b$10$BwiVpB82Gm3y7rrbpxiwk.Nqv5qzux5N05TQMwWaDcQlnMxiQ5oCq';  // Replace with your hashed password

bcrypt.compare(inputPassword, hashedPasswordFromDB, (err, result) => {
  if (err) {
    console.error('Error during manual comparison:', err);
    return;
  }

  if (result) {
    console.log('Passwords match!');
  } else {
    console.log('Invalid credentials. Passwords do not match.');
  }
});
