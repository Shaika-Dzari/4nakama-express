var express = require('express');
var router = express.Router();
var passport = require('passport');
var Message = require('./message');
var authUtils = require('../authutils');
var htmlutils = require('../htmlutils');
var PagingParser = require('../utils/PagingParser');

var DEFAULT_PAGE_SIZE = 5;

// GET messages (blog post)

router.get('/', function(req, res, next) {

    // Paging Params
    var pagingParam = new PagingParser(req, DEFAULT_PAGE_SIZE);
    var params = {};

    if (!authUtils.isLoggedIn(req)) {
        params.published = 1;
    }

    params = pagingParam.merge(params);

    Message.find(params)
            .sort({createdAt: pagingParam.sort()})
            .limit(pagingParam.size())
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
        authorName: user.name,
        published: msgreq.published || 0,
        prettyUrl: htmlutils.sanitizeUrl(msgreq.prettyUrl),
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
        msg.prettyUrl = htmlutils.sanitizeUrl(requestMessage.prettyUrl);
        msg.published = requestMessage.published || 0;
        msg.categories = requestMessage.categories

        msg.save(function(serr, savedMsg) {
            if (serr) next(serr);

            res.json(savedMsg);
        });
    });
});

module.exports = router;