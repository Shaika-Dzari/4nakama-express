var config = require('./config/config');

const sanitizeUrl = (str) => {
    let oneStr = str || '';

    oneStr = oneStr.replace(/[!$?*&#\\]/, '');
    oneStr = oneStr.replace(/[^a-z0-9_\-]/gi, '_');

    return oneStr.toLowerCase();
}


exports.sanitizeUrl = sanitizeUrl;