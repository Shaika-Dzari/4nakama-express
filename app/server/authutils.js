function isLoggedIn(req) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return true;
    }

    return false;
}

function enforceLoggedIn(req, res, next) {
    if (isLoggedIn(req)) {
        next();
    } else {
        res.status(401).end();
    }

};


exports.enforceLoggedIn = enforceLoggedIn;
exports.isLoggedIn = isLoggedIn;

