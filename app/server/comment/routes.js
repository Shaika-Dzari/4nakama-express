var express = require('express');
var router = express.Router();
var passport = require('passport');
var Comment = require('./comment');
var authUtils = require('../authutils');
var PagingParser = require('../utils/PagingParser');
var db = require('../database/db.js');

router.get('/', (req, res, next) => {
    var mid = req.query.messageid;
    if (!mid) {
        res.status(400).json({message: "Missing message's id"});
        return;
    }

    db.any(Comment.ALL_BY_MESSAGEID, {messageid: mid}, (err, comments) => {
        if (err) next(err);

        res.json(comments);
    });

    /*
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
    */
});

router.post('/', (req, res, next) => {

    var user = req.user;
    var commentBody = req.body;

    var authorId = null;
    var authorName = null;

    if (user) {
        authorId = user.id;
        authorName = user.username;
    } else if (commentBody.name) {
        authorName = commentBody.name;
    } else {
        next(new Error("Missing name"));
    }

    if (!commentBody.messageId) {
        next(new Error("Missing message's id"));
    }

    var comment = {
        body: commentBody,
        authorname: authorName,
        authorid: authorId,
        messageid: commentBody.messageId,
        approved: user ? 1 : 0
    };

    db.tx(Comment.CREATE, comment, (err, data) => {
        if (err) next(err);

        comment.id = data.id;
        res.status(201).json(comment);
    });

    /*
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
    */
});

router.put('/:commentId', authUtils.enforceLoggedIn, (req, res, next) => {
    let user = req.user;

    if (user.role != 'admin')
        next(new Error('unauthorized'));


    // We can either approve or delete a comment
    let op = req.query.op;
    let cid = req.params.commentId;

    if (!op || !cid) {
        next(new Error("Missing operation or comment's Id"));
    }

    if (op == 'approve') {
        db.none(Comment.APPROVED_BY_ID, {id: cid}, (err) => {
            if (err) next(err);

            res.sendStatus(204).end();
        });
    } else if (op == 'delete') {
        db.none(Comment.DELETE_BY_ID, {id: cid}, (err) => {
            if (err) next(err);

            res.sendStatus(204).end();
        });
    } else {
        res.status(400).json({message: 'Invalid operation'});
    }

    /*
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
    */

});


module.exports = router;
