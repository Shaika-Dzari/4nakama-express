var express = require('express');
var passport = require('passport');
var fs = require('fs');
var authUtils = require('../authutils');
var htmlutils = require('../htmlutils');
var File = require('./file');
var config = require('../config/config.js');
var FileUtils = require('../utils/FileUtils.js');

const router = express.Router();

const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_MAX_PAGE_SIZE = 30;

router.get('/', function(req, res, next) {

    var fromDate = req.query.fromdate;
    var dir = req.query.dir || 'next';
    let size = Math.min(req.query.size || DEFAULT_PAGE_SIZE, DEFAULT_MAX_PAGE_SIZE);
    let sort = req.query.sort || '-1';
    let params = {};

    if (fromDate) {
        params.createdAt = dir == 'next' ? {$lt: new Date(fromDate)} : {$gt: new Date(fromDate)};
    }

    File.find(params)
            .sort({createdAt: sort})
            .limit(size)
            .select('-ownerId')
            .exec(function (err, files) {
                if (err) next(err);

                res.json(files);
            });

});

router.post('/', authUtils.enforceLoggedIn, (req, res, next) => {
    var isPublicFile = req.query.public || 1;
    var fstream;
    var user = req.user;
    var publicFolder = req.publicFolder;
    var publicFileFolderName = config.file.publicFolderName;

    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {


        var path = isPublicFile ? publicFolder + '/' + publicFileFolderName + '/' + filename : config.file.privateFolder;
        var url = isPublicFile ? '/' + publicFileFolderName + '/' + filename : '/api/files/stream';
        console.log("Uploading: ", filename, encoding, mimetype);
        console.log(path);


        FileUtils.uploadTo(file, path, filename, (finalFileName, finalFilePath) => {

            var newFile = new File({name: filename,
                                    path: url + '/' + finalFileName,
                                    contentType: mimetype,
                                    ownerId: user._id,
                                    ownerName: user.username,
                                    isPublic: isPublicFile});

            // Save virtual file.
            newFile.save(function(serr, savedFile) {
                if (serr) next(serr);

                res.json(savedFile);
            });
        });


    });
    //res.json('OK');
});


module.exports = router;
