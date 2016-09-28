var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.json(req.user);
});

router.post('/logout', passport.authenticate('local'), function(req, res, next) {
    req.logout();
    res.status(204);
});
