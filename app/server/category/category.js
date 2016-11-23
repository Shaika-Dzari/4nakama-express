/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);
*/

const ALL = 'select * from nakama.category order by name';
const ONE_BY_ID = 'select * from category where id = ${id}';
const CREATE_ONE = 'insert into category(name) values(${name}) returning id';

module.exports = {
    ALL: ALL,
    ONE_BY_ID: ONE_BY_ID,
    CREATE_ONE: CREATE_ONE
};
