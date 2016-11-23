var config = require('../config/config.js');
var pgp = require('pg-promise')({
  connect: function (client, dc, isFresh) {
        if (isFresh) {
            client.query('SET search_path = nakama');
        }
    }
});
var db = pgp(config.postgresql.url);

function one(query, params, done) {
    db.one(query, params)
      .then(data => done(null, data))
      .catch(error => done(error));
}

function any(query, params, done) {
    db.any(query, params)
      .then(data => done(null, data))
      .catch(error => done(error));
}

function none(query, params, done) {
    db.none(query, params)
      .then(done(null))
      .catch(error => done(error));
}

function tx(query, params, done) {
    db.tx(t => {
        return t.one(query, params);
    })
    .then(data => done(null, data))
    .catch(error => done(error));
}

module.exports = {
  one: one,
  any: any,
  none: none
};