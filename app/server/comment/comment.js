/*
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
*/

const ALL_BY_PAGE = 'select * from comment order by createdat desc';
const ALL_BY_MESSAGEID = 'select * from comment where messageid = ${messageid} and approved = 1 order by createdat desc';
const ONE_BY_ID = 'select * from comment where id = ${id}';
const CREATE = 'insert into comment(body, authorname, authorid, messageid, approved) values(${body}, ${authorname}, ${authorid}, ${messageid}, ${approved}) returning id';
const APPROVED_BY_ID = 'update comment set approved = TRUE where id = ${id}';
const DELETE_BY_ID = 'delete from comment where id = ${id}';

module.exports = {
    ALL_BY_PAGE: ALL_BY_PAGE,
    ALL_BY_MESSAGEID: ALL_BY_MESSAGEID,
    ONE_BY_ID: ONE_BY_ID,
    CREATE: CREATE,
    APPROVED_BY_ID: APPROVED_BY_ID,
    DELETE_BY_ID: DELETE_BY_ID
};
