var express = require('express');
var passport = require('passport');
var fs = require('fs');
var authUtils = require('../authutils');
var htmlutils = require('../htmlutils');
var File = require('./file');
var config = require('../config/config.js');
var FileUtils = require('../utils/FileUtils.js');
var PagingParser = require('../utils/PagingParser.js');
var db = require('../database/db.js');

const router = express.Router();

const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_MAX_PAGE_SIZE = 30;

router.get('/', function(req, res, next) {

    var pageParam = new PagingParser(req);

    db.any(File.ALL_BY_PAGE, params, (err, files) => {
        if (err) next(err);

        res.json(files);
    });

    /*

    File.find(pageParam.params())
            .sort({createdAt: pageParam.sort()})
            .limit(pageParam.size())
            .select('-ownerId')
            .exec(function (err, files) {
                if (err) next(err);

                res.json(files);
            });
*/
});

router.post('/', authUtils.enforceLoggedIn, (req, res, next) => {
    var isPublicFile = !req.query.public || req.query.public == 1 ? true : false;
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

            var newFile = { name: filename,
                            filepath: url + '/' + finalFileName,
                            contenttype: mimetype,
                            ownerid: user.id,
                            ownername: user.username,
                            ispublic: isPublicFile};

            // Save virtual file.
            db.insert(File.CREATE, newFile, (serr, data) => {
                if (serr) next(serr);

                res.json(data);
            });

            /*
            newFile.save(function(serr, savedFile) {
                if (serr) next(serr);

                res.json(savedFile);
            });
            */
        });


    });
    //res.json('OK');
});


module.exports = router;
