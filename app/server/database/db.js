var config = require('./app/server/config/config.js');
var pgp = require('pg-promise')();
var db = pgp(config.postgresql.url);

function one(query, params, done) {
    db.one(query, params)
      .then(data => done(null, data))
      .catch(error => done(error));
}

function any(query, done, params) {
    db.any(query, params)
      .then(data => done(null, data))
      .catch(error => done(error));
}


exports.one = one;
exports.any = any;