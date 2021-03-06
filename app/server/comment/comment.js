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


const ALL_BY_NEXTPAGE = "select * from comment where createdat < ${createdat} order by createdat desc limit ${size^}";

const ALL_BY_PREVPAGE = "with previous_page as ( " +
                        "    select * " +
                        "    from comment " +
                        "    where createdat > ${createdat} " +
                        "    order by createdat asc " +
                        "    limit ${size^}" +
                        ") " +
                        "select * from previous_page order by createdat desc;";

const ALL_BY_MESSAGEID = 'select * from comment where messageid = ${messageid} and approved = true order by createdat asc';
const ONE_BY_ID = 'select * from comment where id = ${id}';
const CREATE_ONE = 'insert into comment(body, authorname, email, authorid, messageid, approved) values(${body}, ${authorname}, ${authoremail}, ${authorid}, ${messageid}, ${approved}) returning id';
const APPROVED_BY_ID = 'update comment set approved = TRUE where id = ${id}';
const DELETE_BY_ID = 'delete from comment where id = ${id}';

module.exports = {
    ALL_BY_NEXTPAGE: ALL_BY_NEXTPAGE,
    ALL_BY_PREVPAGE: ALL_BY_PREVPAGE,
    ALL_BY_MESSAGEID: ALL_BY_MESSAGEID,
    ONE_BY_ID: ONE_BY_ID,
    CREATE_ONE: CREATE_ONE,
    APPROVED_BY_ID: APPROVED_BY_ID,
    DELETE_BY_ID: DELETE_BY_ID
};
