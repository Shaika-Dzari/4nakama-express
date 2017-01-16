var express = require('express');
var router = express.Router();
var passport = require('passport');
var Category = require('./category');
var authUtils = require('../authutils');
var db = require('../database/db.js');

// GET categories
router.get('/', function(req, res, next) {

    let moduleid = req.query.moduleid;
    let query = moduleid ? Category.ALL_BY_MODULEID : Category.ALL;

    db.any(query, {moduleid: moduleid}, (err, categories) => {
        if (err) next(err);

        res.json(categories);
    });

});

router.post('/', authUtils.enforceLoggedIn, function(req, res, next) {

    let name = req.body.name;
    let desc = req.body.description;
    let moduleid = req.body.moduleid;

    if (!name || !moduleid)
        next(new Error('Missing name or module id'));

    db.insert(Category.CREATE_ONE, {name: name, description: desc, moduleid: moduleid}, (err, data) => {
        if (err) next(err);

        res.status(201).json({
            id: data.id,
            name: name,
            description: desc,
            moduleid: moduleid
        });
    });

});


module.exports = router;