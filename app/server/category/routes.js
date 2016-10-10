var express = require('express');
var router = express.Router();
var passport = require('passport');
var Category = require('./category');
var authUtils = require('../authutils');

// GET categories
router.get('/', function(req, res, next) {
    Category.find(function (err, categories) {
        if (err) next(err);
        res.json(categories);
    });
});

router.post('/', authUtils.enforceLoggedIn, function(req, res, next) {

    var newCategory = new Category({name: req.body.name});
    newCategory.save(function(err, cat, nb) {
        if (err) next(err);

        res.status(201).json(cat);
    })
});


module.exports = router;