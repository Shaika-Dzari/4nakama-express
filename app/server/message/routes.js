var express = require('express');
var router = express.Router();
var passport = require('passport');
var Message = require('./message');
var authUtils = require('../authutils');

var DEFAULT_PAGE_SIZE = 5;
var DEFAULT_MAX_PAGE_SIZE = 20;

// GET messages (blog post)

router.get('/', function(req, res, next) {

    // Paging Params
    var fromDate = req.query.fromdate;
    var size = Math.min(req.query.size || DEFAULT_PAGE_SIZE, DEFAULT_MAX_PAGE_SIZE);
    var dir = req.query.dir || '-1';

    var params = {};

    if (!authUtils.isLoggedIn(req)) {
        params.published = 1;
    }

    if (fromDate) {
        params.createdAt = {$gt: fromDate};
    }

    console.log('/messages', params);

    Message.find(params)
            .sort({createdAt: dir})
            .limit(size)
            .select('-authorId')
            .exec(function (err, mgs) {
                if (err) next(err);
                res.json(mgs);
            });

});

router.get('/:messageid', function(req, res, next) {
    var id = req.params.messageid;
    var params = {_id: id};
    if (!authUtils.isLoggedIn(req)) {
        params.published = 1;
    }

    Message.findOne(params, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(mgs);
    });
});

/**
 * Create new Message.
 */
router.post('/', authUtils.enforceLoggedIn, function(req, res, next) {

    var msg = req.body;
    req.status(201);
});


/**
 * Update new Message.
 */
router.put('/:messageid', authUtils.enforceLoggedIn, function(req, res, next) {
    var id = req.params.messageid;
    var msg = req.body;

    req.status(200);
});

module.exports = router;