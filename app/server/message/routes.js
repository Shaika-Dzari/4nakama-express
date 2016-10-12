var express = require('express');
var router = express.Router();
var passport = require('passport');
var Message = require('./message');
var authUtils = require('../authutils');
var urlUtils = require('../urlutils');

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

    Message.findOne(params, '-authorId', function (err, msg) {
        if (err) next(err);
        res.json(msg);
    });
});

/**
 * Create new Message.
 */
router.post('/', authUtils.enforceLoggedIn, function(req, res, next) {

    var user = req.user;
    var msgreq = req.body;

    var m = new Message({
        title: msgreq.title,
        text: msgreq.text,
        authorId: user._id,
        authorName: user.username,
        published: msgreq.published || 0,
        prettyUrl: urlUtils.sanitizeUrl(msgreq.prettyUrl),
        categories: msgreq.categories
    });

    m.save(function(serr, savedMsg) {
        if (serr) next(serr);

        res.json(savedMsg);
    });
});


/**
 * Update new Message.
 */
router.put('/:messageid', authUtils.enforceLoggedIn, function(req, res, next) {
    var id = req.params.messageid;
    var requestMessage = req.body;

    Message.findOne({_id: id}, function (err, msg) {
        if (err) next(err);

        msg.text = requestMessage.text;
        msg.title = requestMessage.title;
        msg.prettyUrl = urlUtils.sanitizeUrl(requestMessage.prettyUrl);
        msg.published = requestMessage.published || 0;
        msg.categories = requestMessage.categories

        msg.save(function(serr, savedMsg) {
            if (serr) next(serr);

            res.json(savedMsg);
        });
    });
});

module.exports = router;