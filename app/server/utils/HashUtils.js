const bcrypt = require('bcryptjs');

function compare(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  compare
};
