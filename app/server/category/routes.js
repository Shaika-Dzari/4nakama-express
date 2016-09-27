var express = require('express');
var router = express.Router();
var category = require('./category');

// GET categories
router.get('/', function(req, res) {

    category.find(function (err, categories) {
        if (err) {
            res.json(err);
        }

        res.json(categories);
    });

});

router.post('/', function(req, res) {
    var cat = req.body;
    console.log(cat);
});


module.exports = router;