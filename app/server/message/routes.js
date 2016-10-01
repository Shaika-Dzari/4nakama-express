var express = require('express');
var router = express.Router();
var passport = require('passport');
var message = require('./message');


// GET messages (blog post)
router.get('/public/', function(req, res, next) {
    message.find({published: 1}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(messages);
    });
});

router.get('/public/:messageid', function(req, res, next) {
    var id = req.params.messageid;

    message.findOne({published: 1, _id: id}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(messages);
    });
});

router.get('/protected/', passport.authenticate('local'), function(req, res, next) {
    message.find({}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(messages);
    });
});

router.get('/protected/:messageid', passport.authenticate('local'), function(req, res, next) {
    var id = req.params.messageid;

    message.findOne({_id: id}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(messages);
    });
});

/**
 * Create new message.
 */
router.post('/protected/', passport.authenticate('local'), function(req, res, next) {

    var msg = req.body;
    req.status(201);
});


/**
 * Update new message.
 */
router.put('/protected/:messageid', passport.authenticate('local'), function(req, res, next) {
    var id = req.params.messageid;
    var msg = req.body;

    req.status(201);
});



router.post('/', function(req, res) {
    var cat = req.body;

});


module.exports = router;