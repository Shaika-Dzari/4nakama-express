var express = require('express');
var router = express.Router();
var passport = require('passport');
var Message = require('./message');


// GET messages (blog post)
router.get('/public/', function(req, res, next) {

    Message.find({published: 1}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(mgs);
    });
});

router.get('/public/:messageid', function(req, res, next) {
    var id = req.params.messageid;

    Message.findOne({published: 1, _id: id}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(mgs);
    });
});

router.get('/protected/', passport.authenticate('local'), function(req, res, next) {
    Message.find({}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(mgs);
    });
});

router.get('/protected/:messageid', passport.authenticate('local'), function(req, res, next) {
    var id = req.params.messageid;

    Message.findOne({_id: id}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(mgs);
    });
});

/**
 * Create new Message.
 */
router.post('/protected/', passport.authenticate('local'), function(req, res, next) {

    var msg = req.body;
    req.status(201);
});


/**
 * Update new Message.
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