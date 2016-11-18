var fs = require('fs');

function uploadTo(file, uploadToPath, fileName, onSuccess) {
    var date = new Date().toISOString().slice(0, -5).replace(/[\-:\.ZT]/gi, '');
    var finalName = date + '_' + fileName;
    var finalPath = uploadToPath + "/" + finalName;

    var fstream = fs.createWriteStream(finalPath);
    file.pipe(fstream);
    fstream.on('close', function() {
        onSuccess(finalName, finalPath);
    });
}

function exists(path) {
    try {
        fs.accessSync(path, fs.F_OK);
        return true;
    } catch (e) {
        return false;
    }

}


exports.uploadTo = uploadTo;
exports.exists = exists;