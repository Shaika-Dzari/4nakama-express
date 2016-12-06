var express = require('express');
var router = express.Router();
var Stats = require('./stats');
var authUtils = require('../authutils');
var db = require('../database/db.js');

router.get('/', authUtils.enforceLoggedIn, function(req, res, next) {
    db.any(Stats.ALL_STATS, {}, (err, stats) => {
        if (err) next(err);

        res.json(stats);
    });
});


module.exports = router;