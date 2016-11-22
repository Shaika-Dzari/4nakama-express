const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

function compare(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function hash(password) {
    return bcrypt.hashSync(password, salt);
}

module.exports = {
  compare: compare,
  hash: hash
};
