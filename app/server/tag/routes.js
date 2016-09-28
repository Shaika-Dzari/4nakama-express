var express = require('express');
var router = express.Router();
var auth = require('passport').authenticate('local');
var Tag = require('./tag');

router.get('/', function(req, res, next) {
    Tag.find(function (err, tags) {
        if (err) next(err);
        res.json(tags);
    });
});

router.post('/', auth, function(req, res, next) {

    var newTag = new Tag(req.body);
    newTag.save(function(err, tag, nb) {
        if (err) next(err);
        res.status(201).json(tag);
    })
});


module.exports = router;