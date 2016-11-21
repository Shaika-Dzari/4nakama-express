/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);
*/

const ALL = 'select * from category';
const ONE_BY_ID = 'select * from category where id = ${id}';
const SAVE = 'insert into category(name) values(${name}) returning id';

exports.ALL = ALL;
exports.ONE_BY_ID = ONE_BY_ID;
exports.SAVE = SAVE;
