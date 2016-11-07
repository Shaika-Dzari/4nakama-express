// ----------------------------------------------------------------------------
// MongoDB config
// ----------------------------------------------------------------------------
var mongoose   = require('mongoose');
var config = require('./app/server/config/config.js');

mongoose.connect(config.mongodb.url); // connect to the database
mongoose.Promise = global.Promise;

// Create initial account
config.mongodb.init();

// ----------------------------------------------------------------------------
// Express config
// ----------------------------------------------------------------------------
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var busboy = require('connect-busboy');

var publicFolder = path.join(__dirname, 'public');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(busboy());
app.use(require('express-session')({
    secret: 'qokajdteskah',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicFolder));


// passport config
var Account = require('./app/server/account/account.js');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// ----------------------------------------------------------------------------
// Express Routes
// ----------------------------------------------------------------------------
app.use(function(req, res, next) {
    // do logging
    console.log(req.method + ': ' + req.url);
    next(); // make sure we go to the next routes and don't stop here
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!').end();
});

// Pipe to index
app.use(/\/(?!(api|\.css|\.js|\.gif)).*/, function(req, res, next) {
    console.log('redirecting to index.html...')
    res.sendFile('index.html', { root: publicFolder });
});


// All API routes
app.use('/api', require('./app/server/routes.js'));


// ----------------------------------------------------------------------------
// Start server
// ----------------------------------------------------------------------------
var port = process.env.PORT || 1337;        // set our port
app.listen(port);
console.log('Express started on port ' + port);
