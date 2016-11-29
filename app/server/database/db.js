var config = require('../config/config.js');
var pgp = require('pg-promise')({
  connect: function (client, dc, isFresh) {
        if (isFresh) {
            console.log('setting search_path to ' + config.postgresql.schema);
            client.query('SET search_path = ' + config.postgresql.schema);
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
    // console.log(pgp.as.format(query, params));

    db.any(query, params)
      .then(data => done(null, data))
      .catch(error => done(error));
}

function none(query, params, done) {
    db.none(query, params)
      .then(done(null))
      .catch(error => done(error));
}

function insert(query, params, done) {
    db.tx(t => {
        return t.one(query, params);
    })
    .then(data => done(null, data))
    .catch(error => done(error));
}

function update(query, params, done) {
    //console.log(pgp.as.format(query, params));
    db.tx(t => {
        return t.none(query, params);
    })
    .then(data => done(null, data))
    .catch(error => done(error));
}

module.exports = {
  one: one,
  any: any,
  none: none,
  insert: insert,
  update: update
};