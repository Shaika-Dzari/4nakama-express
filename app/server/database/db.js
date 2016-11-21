var config = require('./app/server/config/config.js');
var pgp = require('pg-promise')();
var database = pgp(config.postgresql.url);

module.exports = database;