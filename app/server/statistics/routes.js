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

router.post('/', function(req, res, next) {
    // batch
    db.batch([Stats.UPDATE_STATS_COMMENT_TOTAL_COUNT, Stats.UPDATE_STATS_FILE_TOTAL_COUNT, Stats.UPDATE_STATS_MESSAGE_TOTAL_COUNT], (err, data) => {
        if (err) {
            console.log('error:', err);
        } else {
            console.log('updated');
        }
        res.json('OK');
    });
});


module.exports = router;