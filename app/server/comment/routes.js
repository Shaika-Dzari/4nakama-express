var express = require('express');
var router = express.Router();
var passport = require('passport');
var Comment = require('./comment');
var authUtils = require('../authutils');
var PagingParser = require('../utils/PagingParser');
var db = require('../database/db.js');
var config = require('../config/config.js');

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

});

router.post('/', (req, res, next) => {

    var user = req.user;
    var commentBody = req.body;

    var authorId = null;
    var authorName = null;

    // Check offensive words
    // Bad, use another function.
    let idx = config.comment.rejected.indexOf(commentBody);
    if (idx != -1) {
        res.status(400).json({'message': 'Usage of the word ' + config.comment.rejected[idx] + ' is not allowed.'});
        return;
    }

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

    db.insert(Comment.CREATE_ONE, comment, (err, data) => {
        if (err) next(err);

        comment.id = data.id;
        res.status(201).json(comment);
    });

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

});


module.exports = router;
