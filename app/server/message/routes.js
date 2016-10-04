var express = require('express');
var router = express.Router();
var passport = require('passport');
var Message = require('./message');

var DEFAULT_PAGE_SIZE = 5;
var DEFAULT_MAX_PAGE_SIZE = 20;

// GET messages (blog post)
router.get('/public/', function(req, res, next) {

    // Paging Params
    var fromDate = req.query.fromdate;
    var size = Math.min(req.query.size || DEFAULT_PAGE_SIZE, DEFAULT_MAX_PAGE_SIZE);
    var dir = req.query.dir || '-1';

    if (fromDate) {


        Message.find({published: 1, createdAt: {$gt: fromDate}})
               .sort({createdAt: dir})
               .limit(size)
               .select('-authorId')
               .exec(function (err, mgs) {
                    if (err) next(err);
                    res.json(mgs);
                });


    } else {
        // First Page
        // TODO: Add limit
        Message.find({published: 1}).limit(size).select('-authorId').exec(function (err, mgs) {
            if (err) next(err);
            res.json(mgs);
        });
    }
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