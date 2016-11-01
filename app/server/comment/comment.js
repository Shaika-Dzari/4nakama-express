var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    text: {type: String, required: true},
    createdAt: { type: Date, default: Date.now, required: true},
    authorId: {type: String},
    authorName: {type: String, required: true},
    messageId: {type: String, required: true},
    approved: { type: Number, default: 0, required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);
