var express = require('express');
var router = express.Router();
var passport = require('passport');
var Message = require('./message');
var authUtils = require('../authutils');
var htmlutils = require('../htmlutils');
var PagingParser = require('../utils/PagingParser');
var db = require('../database/db.js');

var DEFAULT_PAGE_SIZE = 5;

// GET messages (blog post)

router.get('/', function(req, res, next) {

    // Paging Params
    var pagingParam = new PagingParser(req, DEFAULT_PAGE_SIZE);
    var query;

    if (!authUtils.isLoggedIn(req)) {
        query = Message.ALL_PUBLISHED_BY_PAGE;
    } else {
        query = Message.ALL_BY_PAGE;
    }

    db.any(query, pagingParam.params(), (err, msgs) => {
        if (err) next(err);

        res.json(mgs);
    });

    /*

    Message.find(params)
            .sort({createdAt: pagingParam.sort()})
            .limit(pagingParam.size())
            .select('-authorId')
            .exec(function (err, mgs) {
                if (err) next(err);
                res.json(mgs);
            });
            */
});

router.get('/:messageid', function(req, res, next) {
    var id = req.params.messageid;
    var params = {_id: id};
    if (!authUtils.isLoggedIn(req)) {
        params.published = 1;
    }

    // TODO: published flag

    db.one(Message.ONE_BY_ID, {id: id}, (err, msg) => {
        if (err) next(err);

        res.json(msg);
    });

    /*
    Message.findOne(params, '-authorId', function (err, msg) {
        if (err) next(err);
        res.json(msg);
    });
    */
});

/**
 * Create new Message.
 */
router.post('/', authUtils.enforceLoggedIn, function(req, res, next) {

    var user = req.user;
    var msgreq = req.body;

    var m = {
        title: msgreq.title,
        body: msgreq.body,
        authorid: user._id,
        authorname: user.name,
        published: !!msgreq.published,
        prettyurl: htmlutils.sanitizeUrl(msgreq.prettyUrl)
    };

    db.tx(Message.CREATE_ONE, m, (err, data) => {
        if (err) next(err);

        m.id = data.id;
        res.json(m);
    });

    /*
    m.save(function(serr, savedMsg) {
        if (serr) next(serr);

        res.json(savedMsg);
    });
    */
});


/**
 * Update new Message.
 */
router.put('/:messageid', authUtils.enforceLoggedIn, function(req, res, next) {
    var id = req.params.messageid;
    var requestMessage = req.body;

    requestMessage.prettyurl = htmlutils.sanitizeUrl(requestMessage.prettyurl);
    requestMessage.published = !!requestMessage.published;


    db.tx(Message.UPDATE_ONE, requestMessage, (err, data) => {
        if (serr) next(serr);

        res.json(requestMessage);
    })

    /*
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
     */
});

module.exports = router;