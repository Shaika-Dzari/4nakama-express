let express = require('express');
let router = express.Router();
let Message = require('./message');
let authUtils = require('../authutils');
let htmlutils = require('../htmlutils');
let PagingParser = require('../utils/PagingParser');
let db = require('../database/db.js');


router.get('/', function(req, res, next) {

    // Paging Params
    let pagingParam = new PagingParser(req, Message.DEFAULT_PAGE_SIZE);
    let moduleid = req.query.moduleid || null;
    let query;

    if (!authUtils.isLoggedIn(req)) {
        if (pagingParam.direction() == 'next') {
            query = Message.ALL_PUBLISHED_BY_NEXTPAGE;
        } else {
            query = Message.ALL_PUBLISHED_BY_PREVPAGE;
        }

    } else {
        query = Message.ALL_BY_PAGE;
    }

    db.any(query, pagingParam.merge({moduleid: moduleid}), (err, msgs) => {
        if (err) next(err);

        res.json(Message.computePrettyUrl(msgs));
    });

});

router.get('/:messageid', function(req, res, next) {
    let id = req.params.messageid;
    let params = {id: id};
    if (!authUtils.isLoggedIn(req)) {
        params.published = 1;
    }

    // TODO: published flag

    db.one(Message.ONE_BY_ID, {id: id}, (err, msg) => {
        if (err) next(err);

        res.json(Message.computePrettyUrl(msg));
    });

});

/**
 * Create new Message.
 */
router.post('/', authUtils.enforceLoggedIn, function(req, res, next) {

    let user = req.user;
    let msgreq = req.body;

    let m = {
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
        res.json(Message.computePrettyUrl(m));
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
        res.json(Message.computePrettyUrl(requestMessage));
    })

});

module.exports = router;