var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    username: String,
    password: String,
    email: {type: String, required: true},
    name: {type: String},
    createdAt: { type: Date, default: Date.now },
    role: {type: String, default: 'author'},
    enabled: {type: Number, default: 1}
});

var loginOptions = {
    limitAttempts: true,
    maxAttempts: 5
}

AccountSchema.plugin(passportLocalMongoose, loginOptions);

module.exports = mongoose.model('Account', AccountSchema);
