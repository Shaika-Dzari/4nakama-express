var express = require('express');
var router = express.Router();
var message = require('./message');

// GET messages (blog post)
router.get('/', function(req, res) {

    message.find({published: 1}, '-authorId', function (err, mgs) {

        if (err) {
            res.json(err);
        }

        res.json(messages);
    });

});

router.post('/', function(req, res) {
    var cat = req.body;

});


module.exports = router;