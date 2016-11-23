/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    name: {type: String, required: true},
    path: {type: String, required: true},
    contentType: {type: String, default: 'application/octet-stream', required: true},
    ownerId: {type: String, required: true},
    ownerName: {type: String, required: true},
    isPublic: { type: Number, default: 1, required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', FileSchema);
*/

const ALL_BY_PAGE = "select * from file where createat < ${createat} order by createat ${orderby} limit ${size}";
const CREATE = "";

module.exports = {
    ALL_BY_PAGE: ALL_BY_PAGE,
    CREATE: CREATE
};
