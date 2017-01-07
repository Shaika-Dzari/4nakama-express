var router = require('express').Router();

var Module = require('./module/module.js');
var Message = require('./message/message');
var Category = require('./category/category');
var db = require('./database/db.js');
var PagingParser = require('./utils/PagingParser');

var normalize = require('../common/Normalize.js');

// Pipe to index
// router.use(/\/(?!(api|\.css|\.js|\.gif)).*/, function(req, res, next) {
//     console.log('redirecting to index.html...')
//     res.sendFile('index.html', { root: publicFolder });
// });

router.use('/', (req, res, next) => {

    let pagingParam = new PagingParser(req, Message.DEFAULT_PAGE_SIZE);
    let cnt = db.unwrap();

    cnt.task(t=> {
        return t.batch([
            t.any(Module.ALL),
            t.any(Message.ALL_PUBLISHED_BY_NEXTPAGE, pagingParam.merge({moduleid: null})),
            t.any(Category.ALL)
        ]);
    })
    .then(objs=> {
        let store = {};
        if (objs) {

            if (!objs[0]) { // Modules are mandatory
                throw new Error("Unable to load modules.");
            }

            let ms = Module.rebuildModuleObject(objs[0]);
            store.modules = normalize(ms);
            // Build Code idx
            let modulecodes = {};
            store.modules.index.forEach(i => {
                modulecodes[store.modules.items[i].code] = i;
            });
            store.modules.codeindex = modulecodes;

            if (objs[1]) {
                let normmsg = normalize(Message.computePrettyUrl(objs[1]));
                store.messages = {};

                for (let mid in normmsg.items) {
                    normmsg.items[mid].body = normmsg.items[mid].body.replace(/(?:\r\n|\r|\n)/g, '\\n');
                }

                store.messages.items = normmsg.items;
                store.messages.index = {};
                store.messages.index[modulecodes['BLOG']] = normmsg.index;
                store.messages.preloaded = true;
            }

            if (objs[2]) {
                store.categories = normalize(objs[2]);
                store.categories.preloaded = true;
            }

        }


        res.render('basic', {
            page: {title: '4nakama.net - A whisper from my Ghost'},
            preloadedState: JSON.stringify(store)
        });
    })
    .catch(error=> {
        next(error);
    });



});

module.exports = router;