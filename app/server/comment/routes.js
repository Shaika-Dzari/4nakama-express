var express = require('express');
var router = express.Router();
var passport = require('passport');
var sanitizeHtml = require('sanitize-html');
var Comment = require('./comment');
var authUtils = require('../authutils');
var PagingParser = require('../utils/PagingParser.js');
var ApiError = require('../utils/ApiError.js');
var db = require('../database/db.js');
var config = require('../config/config.js');

var DEFAULT_PAGE_SIZE = 10;

router.get('/', (req, res, next) => {
    var mid = req.query.messageid;
    var pagingParam = new PagingParser(req, DEFAULT_PAGE_SIZE);

    var user = req.user;
    var query = null;

    if (!mid && (!user || user.role != 'admin')) {
        res.status(400).json({message: "Missing message's id"});
        return;
    }

    if (mid) {
        query = Comment.ALL_BY_MESSAGEID;
    } else if (pagingParam.direction() == 'next') {
        query = Comment.ALL_BY_NEXTPAGE;
    } else {
        query = Comment.ALL_BY_PREVPAGE;
    }

    db.any(query, pagingParam.merge({messageid: mid}), (err, comments) => {
        if (err) next(err);

        res.json(comments);
    });
});

router.post('/', (req, res, next) => {

    var user = req.user;
    var commentBody = req.body;

    var authorId = null;
    var authorName = null;
    var authorEmail = null;

    // Check offensive words
    // Bad, use another function.
    let idx = config.comment.rejected.indexOf(commentBody.text);
    if (idx != -1) {
        return next(new ApiError(400, 'Usage of the word ' + config.comment.rejected[idx] + ' is not allowed.'));
    }

    console.log('after');

    if (user) {
        authorId = user.id;
        authorName = user.username;
    } else if (commentBody.name && commentBody.email) {
        authorName = commentBody.name;
        authorEmail = commentBody.email;
    } else {
        next(new Error("Missing name or email"));
    }

    if (!commentBody.messageId) {
        next(new Error("Missing message's id"));
    }

    var body = sanitizeHtml(commentBody.text, {allowedTags: [ 'br' ]})

    var comment = {
        body: body,
        authorname: authorName,
        authoremail: authorEmail,
        authorid: authorId,
        messageid: commentBody.messageId,
        approved: user ? true : false
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
    let op = req.body.operation;
    let cid = req.params.commentId;

    if (!op || !cid) {
        console.log(req, cid, op);
        next(new Error("Missing operation or comment's Id"));
    }

    if (op == 'approve') {
        db.none(Comment.APPROVED_BY_ID, {id: cid}, (err) => {
            if (err) next(err);

            res.json({id: cid, operation: 'approved'});
        });
    } else if (op == 'delete') {
        db.none(Comment.DELETE_BY_ID, {id: cid}, (err) => {
            if (err) next(err);

            res.json({id: cid, operation: 'deleted'});
        });
    } else {
        res.status(400).json({message: 'Invalid operation'});
    }

});


module.exports = router;
