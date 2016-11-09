var fs = require('fs');

function uploadTo(file, uploadToPath, onSuccess) {
    var fstream = fs.createWriteStream(uploadToPath);
    file.pipe(fstream);
    fstream.on('close', onSuccess);
}

exports.uploadTo = uploadTo;