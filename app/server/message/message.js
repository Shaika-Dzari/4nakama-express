var mongoose = require('mongoose');
//var Tag = require('../tag/tag');
//var Category = require('../category/category');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    published: { type: Number, default: 0, required: true},
    createdAt: { type: Date, default: Date.now, required: true},
    updatedAt: { type: Date},
    authorId: {type: Number, required: true},
    authorName: {type: String, required: true},
    tags: [String],
    categories: [String],
    prettyUrl: String
});

module.exports = mongoose.model('Message', MessageSchema);