var express = require('express');
var router = express.Router();
var passport = require('passport');
var Category = require('./category');
var authUtils = require('../authutils');
var db = require('../database/db.js');

// GET categories
router.get('/', function(req, res, next) {

    db.any(Category.ALL, null, (err, categories) => {
        if (err) next(err);

        res.json(categories);
    });

});

router.post('/', authUtils.enforceLoggedIn, function(req, res, next) {

    var name = req.body.name;

    if (!name)
        next(new Error('Missing name'));

    db.one(SAVE, {name: name}, (err, data) => {
        if (err) next(err);

        res.status(201).json({id: data.id, name: name});
    });

    /*
    var newCategory = new Category({name: req.body.name});
    newCategory.save(function(err, cat, nb) {
        if (err) next(err);

        res.status(201).json(cat);
    })
    */
});


module.exports = router;