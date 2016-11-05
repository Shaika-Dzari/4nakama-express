var express = require('express');
var passport = require('passport');
var authUtils = require('../authutils');
var htmlutils = require('../htmlutils');
var File = require('./file');

const router = express.Router();

router.get('/', function(req, res, next) {
    res.json('OK');
});

router.post('/', authUtils.enforceLoggedIn, function(req, res, next) {
    res.json('OK');
});


module.exports = router;
