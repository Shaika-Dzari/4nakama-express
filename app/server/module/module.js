const ALL = `select m.id, m.code, m.name, m.moduleorder, m.url, m.enablemodule, m.enablecomment, m.enablecategory,
                    mt.id as mtid, mt.key as mtkey, mt.value as mtvalue, tp.id as tpid, tp.name as tpvaluetypename
             from module m
                left outer join modulemeta mt on (m.id = mt.moduleid)
                left outer join modulemetatype tp on (mt.valuetypeid = tp.id)
             order by m.moduleorder
             `;

const ALL_BY_STATUS = `select m.id, m.code, m.name, m.moduleorder, m.url, m.enablemodule, m.enablecomment, m.enablecategory,
                              mt.id as mtid, mt.key as mtkey, mt.value as mtvalue, tp.name as valuetypename
                       from module m
                            left outer join modulemeta mt on (m.id = mt.moduleid)
                            left outer join modulemetatype tp on (mt.valuetypeid = tp.id)
                       where m.enablemodule = $(enablemodule)
                       order by m.moduleorder
                       `;


function rebuildModuleObject(rows) {
    if (rows) {
        let modules = [];
        let code = '';
        let m = null;

        for (let r of rows) {

            if (r.code !== code) {

                if (m) modules.push(m);

                // New Module
                m = {
                    id: r.id,
                    code: r.code,
                    name: r.name,
                    moduleorder: r.moduleorder,
                    url: r.url,
                    enablemodule: r.enablemodule,
                    enablecomment: r.enablecomment,
                    enablecategory: r.enablecategory,
                    meta: []
                };
            }

            code = r.code;
            if (r.mtid) {

                // Meta row
                m.meta.push({
                    id: r.mtid,
                    key: r.mtkey,
                    value: r.mtvalue,
                    valuetypeid: r.tpid,
                    valuetypename: r.tpvaluetypename
                });
            }

        }

        // Add last
        if (m) modules.push(m);

        return modules;
    }

    return rows;
}

module.exports = {
    ALL: ALL,
    ALL_BY_STATUS: ALL_BY_STATUS,
    rebuildModuleObject: rebuildModuleObject
}