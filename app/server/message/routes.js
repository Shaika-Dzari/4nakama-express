var express = require('express');
var router = express.Router();
var Message = require('./message');
var authUtils = require('../authutils');
var htmlutils = require('../htmlutils');
var PagingParser = require('../utils/PagingParser');
var db = require('../database/db.js');

var DEFAULT_PAGE_SIZE = 5;

router.get('/', function(req, res, next) {

    // Paging Params
    var pagingParam = new PagingParser(req, DEFAULT_PAGE_SIZE);
    var query;

    if (!authUtils.isLoggedIn(req)) {
        if (pagingParam.direction() == 'next') {
            query = Message.ALL_PUBLISHED_BY_NEXTPAGE;
        } else {
            query = Message.ALL_PUBLISHED_BY_PREVPAGE;
        }

    } else {
        query = Message.ALL_BY_PAGE;
    }

    db.any(query, pagingParam.params(), (err, msgs) => {
        if (err) next(err);

        res.json(msgs);
    });

});

router.get('/:messageid', function(req, res, next) {
    var id = req.params.messageid;
    var params = {id: id};
    if (!authUtils.isLoggedIn(req)) {
        params.published = 1;
    }

    // TODO: published flag

    db.one(Message.ONE_BY_ID, {id: id}, (err, msg) => {
        if (err) next(err);

        let response = {
            data: msg,
            total: msg && msg.length > 0 ? msg[0].total_count : null
        }

        res.json(response);
    });

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
        authorid: user.id,
        authorname: user.username,
        published: !!msgreq.published,
        prettyurl: htmlutils.sanitizeUrl(msgreq.prettyUrl),
        categories: JSON.stringify(msgreq.categories)
    };

    db.insert(Message.CREATE_ONE, m, (err, data) => {
        if (err) next(err);

        m.id = data.id;
        res.json(m);
    });
});


/**
 * Update new Message.
 */
router.put('/:messageid', authUtils.enforceLoggedIn, function(req, res, next) {
    let id = req.params.messageid;
    let requestMessage = req.body;
    let originalCategories = requestMessage.categories

    requestMessage.prettyurl = htmlutils.sanitizeUrl(requestMessage.prettyurl);
    requestMessage.published = !!requestMessage.published;
    requestMessage.id = parseInt(id, 10);
    requestMessage.categories = JSON.stringify(requestMessage.categories);

    db.update(Message.UPDATE_ONE, requestMessage, (serr) => {
        if (serr) next(serr);

        // Put cats back
        requestMessage.categories = originalCategories;
        res.json(requestMessage);
    })

});

module.exports = router;