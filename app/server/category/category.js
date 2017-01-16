const ALL = 'select * from nakama.category order by name';
const ALL_BY_MODULEID = 'select * from nakama.category where c.moduleid = $(moduleid) order by name';
const ONE_BY_ID = 'select * from category where id = $(id)';
const CREATE_ONE = 'insert into category(name, description, moduleid) values($(name), $(description), $(moduleid)) returning id';
const ALL_BY_MODULECODE = `select c.*
                           from nakama.category c inner join module m on (c.moduleid = m.id)
                           where m.code = $(modulecode)
                           order by name`;

module.exports = {
    ALL: ALL,
    ONE_BY_ID: ONE_BY_ID,
    CREATE_ONE: CREATE_ONE,
    ALL_BY_MODULECODE: ALL_BY_MODULECODE,
    ALL_BY_MODULEID: ALL_BY_MODULEID
};
