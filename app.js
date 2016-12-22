var config = require('./app/server/config/config.js');
var db = require('./app/server/database/db.js');

// ----------------------------------------------------------------------------
// MongoDB config
// ----------------------------------------------------------------------------
/*
var mongoose   = require('mongoose');

mongoose.connect(config.mongodb.url); // connect to the database
mongoose.Promise = global.Promise;

// Create initial account
config.mongodb.init();
*/

// ----------------------------------------------------------------------------
// Express config
// ----------------------------------------------------------------------------
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var busboy = require('connect-busboy');
var fs = require('fs');

var hbs = require('express-handlebars');
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Passport config
require('./app/server/auth/authentication.js');

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

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false
};

app.use(express.static(publicFolder, options));


// passport config
/*
var Account = require('./app/server/account/account.js');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
*/

// ----------------------------------------------------------------------------
// Express Routes
// ----------------------------------------------------------------------------
app.use(function(req, res, next) {
    // do logging
    console.log(req.method + ': ' + req.url);
    req.publicFolder = publicFolder;
    next(); // make sure we go to the next routes and don't stop here
});

// Pipe to index
// app.use(/\/(?!(api|\.css|\.js|\.gif)).*/, function(req, res, next) {
//     console.log('redirecting to index.html...')
//     res.sendFile('index.html', { root: publicFolder });
// });


// All API routes
app.use('/api', require('./app/server/api-routes.js'));

// Index
app.use('/', require('./app/server/server-routes.js'));

app.use(function(err, req, res, next) {

  if (err.name == 'ApiError') {
      console.log(err.httpCode, err.message);
      res.status(err.httpCode).json({message: err.message}).end();
  } else {
      console.log(err);
      res.status(500).json({message: 'Unexpected error.'}).end();
  }
});

// ----------------------------------------------------------------------------
// Check storage
// ----------------------------------------------------------------------------
var privateFileFolderPath = config.file.privateFolderPath;
var privateFileFolderName = config.file.privateFolderName;
var publicFileFolderName = config.file.publicFolderName;

var mkdir = (path) => {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
};

mkdir(privateFileFolderPath + '/' + privateFileFolderName);
mkdir(publicFolder + '/' + publicFileFolderName);

// Init db
config.postgresql.init(db);

// ----------------------------------------------------------------------------
// Start server
// ----------------------------------------------------------------------------
var port = process.env.PORT || 1337;        // set our port
app.listen(port);
console.log('Express started on port ' + port);
