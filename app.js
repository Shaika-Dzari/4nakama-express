// ----------------------------------------------------------------------------
// MongoDB config
// ----------------------------------------------------------------------------
var mongoose   = require('mongoose');
var mongodbConfig = require('./app/server/config/mongodb.js');

mongoose.connect(mongodbConfig.url); // connect to the database
mongoose.Promise = global.Promise;

// Create initial account
mongodbConfig.init();

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

var publicFolder = path.join(__dirname, 'public');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
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
    console.log('Requested: ' + req.url);
    next(); // make sure we go to the next routes and don't stop here
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Pipe to index
app.use('/!(api).*', function(res, req) {
    res.sendfile('index.html', { root: publicFolder });
});


// All API routes
app.use('/api', require('./app/server/routes.js'));


// ----------------------------------------------------------------------------
// Start server
// ----------------------------------------------------------------------------
var port = process.env.PORT || 1337;        // set our port
app.listen(port);
console.log('4nakama-express started on port ' + port);
