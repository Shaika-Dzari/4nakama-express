let express = require('express');
let router = express.Router();
let Message = require('./message');
let authUtils = require('../authutils');
let htmlutils = require('../htmlutils');
let PagingParser = require('../utils/PagingParser');
let WhereBuilder = require('../utils/WhereBuilder');
let db = require('../database/db.js');


const getMessage = (req, res, next) => {
    // Paging Params
    let pagingParam = new PagingParser(req, Message.DEFAULT_PAGE_SIZE);
    let moduleid = req.query.moduleid || null;
    let published = req.query.p || true;
    let query;

    if (!authUtils.isLoggedIn(req) || published) {
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
}

const getMessage2 = (req, res, next) => {

    // Paging Params
    let pagingParam = new PagingParser(req, Message.DEFAULT_PAGE_SIZE);
    let moduleid = req.query.moduleid;
    let published = req.query.p;
    let categoryid = req.query.categoryid;
    let query = pagingParam.direction() == 'next' ? Message.DYNAMIC_BY_NEXTPAGE : Message.DYNAMIC_BY_PREVPAGE;
    let builder = new WhereBuilder();

    // categories @> '[{"id": 4}]'

    builder.
        group().
            add('message', 'moduleid', moduleid).
            or('module', 'code', 'BLOG').
        end().
        and('message', 'published', authUtils.isLoggedIn(req) ? published || true: false)
        ;

    // Categories are jsonb
    if (categoryid) {
        builder.and('message', 'categories', categoryid ? JSON.stringify([{id: Number.parseInt(categoryid)}]) : null, '@>');
    }

    db.any(builder.build(query), pagingParam.merge(builder.params()), (err, msgs) => {
        if (err) next(err);

        res.json(Message.computePrettyUrl(msgs));
    });
}

router.get('/', getMessage2);

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
        prettyurl: htmlutils.sanitizeUrl(msgreq.prettyurl),
        categories: JSON.stringify(msgreq.categories),
        moduleid: parseInt(msgreq.moduleid, 10)
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