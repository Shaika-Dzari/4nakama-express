var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', AccountSchema);
