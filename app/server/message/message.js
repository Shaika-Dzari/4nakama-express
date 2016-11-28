/*
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
    authorId: {type: String, required: true},
    authorName: {type: String, required: true},
    categories: [{_id: String, name: String}],
    prettyUrl: String
});

module.exports = mongoose.model('Message', MessageSchema);
*/


const ALL_BY_PAGE = "select * from message where createdat < ${createdat} order by createdat desc limit ${size^}";

const ALL_PUBLISHED_BY_PREVPAGE = "select * from message where createdat < ${createdat} and published = true order by createdat desc limit ${size^}";

const ALL_PUBLISHED_BY_NEXTPAGE = "with previous_page as ( " +
                                  "    select * " +
                                  "    from message " +
                                  "    where createdat > ${createdat} " +
                                  "    and published = true " +
                                  "    order by createdat asc " +
                                  "    limit ${size^}" +
                                  ") " +
                                  "select * from previous_page order by createdat desc;";
const ONE_BY_ID = "select * from message where id = ${id}";
const CREATE_ONE = "insert into message(title, body, published, authorname, authorid, prettyurl, categories) values(${title}, ${body}, ${published}, ${authorname}, ${authorid}, ${prettyurl}, ${categories}) returning id";
const UPDATE_ONE = "update message set title = ${title}, body = ${body}, prettyurl = ${prettyurl}, published = ${published}, categories = jsonb_object(${categories}) where id = ${id}";
const UPDATE_ONE_PUBLICATION = "update message set published = ${published} where id = ${id}";

module.exports = {
    ALL_BY_PAGE: ALL_BY_PAGE,
    ALL_PUBLISHED_BY_PREVPAGE: ALL_PUBLISHED_BY_PREVPAGE,
    ALL_PUBLISHED_BY_NEXTPAGE: ALL_PUBLISHED_BY_NEXTPAGE,
    ONE_BY_ID: ONE_BY_ID,
    CREATE_ONE: CREATE_ONE,
    UPDATE_ONE: UPDATE_ONE,
    UPDATE_ONE_PUBLICATION: UPDATE_ONE_PUBLICATION
};