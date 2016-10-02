var express = require('express');
var passport = require('passport');
var Account = require('./account');
var router = express.Router();

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.json(req.user);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.json('ok');
});


module.exports = router;