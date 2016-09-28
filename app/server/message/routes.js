var express = require('express');
var router = express.Router();
var passport = require('passport');
var message = require('./message');

// GET messages (blog post)
router.get('/', function(req, res, next) {
    message.find({published: 1}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(messages);
    });
});

router.get('/:messageid', function(req, res, next) {
    var id = req.params.messageid;

    message.findOne({published: 1, _id: id}, '-authorId', function (err, mgs) {
        if (err) next(err);
        res.json(messages);
    });
});

router.post('/', function(req, res) {
    var cat = req.body;

});


module.exports = router;