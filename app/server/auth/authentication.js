var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../account/account.js');
var db = require('../database/db.js');
var HashUtils = require('../utils/HashUtils.js');

passport.use(new LocalStrategy(function(username, password, done) {

    db.one(Account.ONE_BY_USERNAME, {username: username}, (err, user) => {

        if (err) { return done(err); }

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (!HashUtils.compare(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    });

}));

passport.serializeUser((user, done) => {
    let partialUser = {
        id: user.id,
        username: user.username,
        role: user.role,
        displayname: user.displayname
    };
    done(null, partialUser);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
