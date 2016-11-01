var config = require('./config/config');

const sanitizeUrl = (str) => {
    let oneStr = str || '';

    oneStr = oneStr.replace(/[!$?*&#\\]/, '');
    oneStr = oneStr.replace(/[^a-z0-9_\-]/gi, '_');

    return oneStr.toLowerCase();
}

/*
function sanitizeUrl(str) {
    var oneStr = str || '';

    oneStr = oneStr.replace(/[!$?*&#\\]/, '');
    oneStr = oneStr.replace(/[^a-z0-9_\-]/gi, '_');

    return oneStr.toLowerCase();
}
*/

function checkUnacceptableWords(text) {
    var offensiveWords = config.comment.rejected || [];
    return offensiveWords.some(w => text.indexOf(w));
}

function hasHtmlTag() {

}

exports.sanitizeUrl = sanitizeUrl;