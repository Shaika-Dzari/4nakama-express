var express = require('express');
var router = express.Router();
var tag = require('./tag');

router.get('/', function(req, res) {
    tag.find(function (err, tags) {

        if (err) {
            res.json(err);
        }

        res.json(tags);
    });
});

module.exports = router;