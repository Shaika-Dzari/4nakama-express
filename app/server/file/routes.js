var express = require('express');
var passport = require('passport');
var fs = require('fs');
var authUtils = require('../authutils');
var htmlutils = require('../htmlutils');
var File = require('./file');

const router = express.Router();

router.get('/', function(req, res, next) {
    res.json('OK');
});

router.post('/', authUtils.enforceLoggedIn, (req, res, next) => {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log("Uploading: ", filename, encoding, mimetype);
        console.log(__dirname + '/' + filename);
        fstream = fs.createWriteStream(__dirname + '/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });

    //res.json('OK');
});


module.exports = router;
