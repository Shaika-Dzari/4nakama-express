function normalize(response, asmodule) {

    let list = {};
    let idx = [];
    let modidx = {};

    if (response && Array.isArray(response)) {
        response.forEach(i => {
            let id = i.id;
            let modid = i.moduleid;
            list[id] = i;
            idx.push(id);

            if (asmodule && modid) {

                if (!modidx[modid]) {
                    modidx[modid] = [];
                }

                modidx[modid].push(id);
            }
        });
    }

    let obj = {
        items: list,
        index: idx
    };

    if (asmodule) {
        obj.moduleindex = modidx;
    }

    return obj;
}

module.exports = normalize;