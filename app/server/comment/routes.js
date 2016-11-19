var express = require('express');
var router = express.Router();
var passport = require('passport');
var Comment = require('./comment');
var authUtils = require('../authutils');
var PagingParser = require('../utils/PagingParser');

router.get('/', (req, res, next) => {
    var mid = req.query.messageid;
    var params = {};
    var isLoggedIn = authUtils.isLoggedIn(req);

    var pageParam = new PagingParser(req);

    if (!mid && !isLoggedIn) {
        next(new Error('unauthorized'));
    }

    if (mid)
        params.messageId = mid;

    if (isLoggedIn)
        params.approved = 1;

    params = pageParam.merge(params);

    Comment.find(params)
            .sort({createdAt: pageParam.sort()})
            .limit(pageParam.size())
            .select('-authorId')
            .exec(function (err, comments) {
                if (err) next(err);

                res.json(comments);
            });
});

router.post('/', (req, res, next) => {
    var user = req.user;
    var commentBody = req.body;

    var authorId = null;
    var authorName = null;

    if (user) {
        authorId = user._id;
        authorName = user.name;
    } else if (commentBody.name) {
        authorName = commentBody.name;
    } else {
        next(new Error("Missing name"));
    }

    var comment = new Comment({
        text: commentBody.text,
        authorId: authorId,
        authorName: authorName,
        messageId: commentBody.messageId,
        approved: user ? 1 : 0
    });

    comment.save((serr, savedComment) => {
        if (serr) next(serr);

        res.json(savedComment);
    });
});

router.put('/:commentId', authUtils.enforceLoggedIn, (req, res, next) => {
    let user = req.user;

    if (user.role != 'admin')
        next(new Error('unauthorized'));


    // We can either approve or delete a comment
    let op = req.query.op;
    let cid = req.params.commentId;

    Comment.findById(cid, (err, comment) => {
        if (err) next(err);

        if (!comment) {
            res.sendStatus(204).end();
            return;
        }

        if (op == 'approve') {
            comment.approve = 1;
            comment.save((serr, savedComment) => {
                if (serr) next(serr);

                res.json(savedComment);
            });

        } else if (op == 'delete') {
            comment.remove((eerr, comment) => {
                res.sendStatus(204);
            });
        }
    });


});


// router.delete('/:commentId', authUtils.enforceLoggedIn, (req, res, next) => {

// });

/*


var CommentSchema = new Schema({
    text: {type: String, required: true},
    createdAt: { type: Date, default: Date.now, required: true},
    authorId: {type: String},
    authorName: {type: String, required: true},
    messageId: {type: String, required: true},
    approved: { type: Number, default: 0, required: true}
});

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
 */


module.exports = router;
