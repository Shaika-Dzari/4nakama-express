const DEFAULT_PAGE_SIZE = 5;

const ALL_BY_PAGE = "select m.* " +
                    "from message m inner join module md on (m.moduleid = md.id) " +
                    "where m.createdat < ${createdat} " +
                    "  and (m.moduleid = ${moduleid} or md.code = 'BLOG') " +
                    "order by m.createdat desc limit ${size^}";

const ALL_PUBLISHED_BY_NEXTPAGE = "select m.* " +
                                  "from message m inner join module md on (m.moduleid = md.id) " +
                                  "where m.createdat < ${createdat} " +
                                  "  and m.published = true " +
                                  "  and (m.moduleid = ${moduleid} or md.code = 'BLOG') " +
                                  "order by m.createdat desc " +
                                  "limit ${size^}";

const ALL_PUBLISHED_BY_PREVPAGE = "with previous_page as ( " +
                                  "    select m.* " +
                                  "    from message m inner join module md on (m.moduleid = md.id) " +
                                  "    where m.createdat > ${createdat} " +
                                  "      and m.published = true " +
                                  "      and (m.moduleid = ${moduleid} or md.code = 'BLOG') " +
                                  "    order by m.createdat asc " +
                                  "    limit ${size^}" +
                                  ") " +
                                  "select * from previous_page order by createdat desc;";

const ONE_BY_ID = "select * from message where id = ${id} ";
const CREATE_ONE = "insert into message(title, body, published, authorname, authorid, prettyurl, categories, moduleid) " +
                   "values(${title}, ${body}, ${published}, ${authorname}, ${authorid}, ${prettyurl}, ${categories}, ${moduleid}) " +
                   "returning id, createdat ";
const UPDATE_ONE = "update message set title = ${title}, body = ${body}, prettyurl = ${prettyurl}, published = ${published}, categories = ${categories} where id = ${id}";
const UPDATE_ONE_PUBLICATION = "update message set published = ${published} where id = ${id}";


function computePrettyUrl(msgs) {
    if (msgs) {
        if (Array.isArray(msgs)) {
            for (let m of msgs) {
                m.permurl = m.id + '--' + m.prettyurl;
            }
        } else {
            msgs.permurl = msgs.id + '--' + msgs.prettyurl;
        }
    }
    return msgs;
}

module.exports = {
    ALL_BY_PAGE: ALL_BY_PAGE,
    ALL_PUBLISHED_BY_PREVPAGE: ALL_PUBLISHED_BY_PREVPAGE,
    ALL_PUBLISHED_BY_NEXTPAGE: ALL_PUBLISHED_BY_NEXTPAGE,
    ONE_BY_ID: ONE_BY_ID,
    CREATE_ONE: CREATE_ONE,
    UPDATE_ONE: UPDATE_ONE,
    UPDATE_ONE_PUBLICATION: UPDATE_ONE_PUBLICATION,
    computePrettyUrl: computePrettyUrl
};