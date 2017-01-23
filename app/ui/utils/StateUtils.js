const expand = (partialstate, modulizedObjs, currentModuleId, reset) => {
    let newitems = Object.assign({}, partialstate.items);
    let newindex = [...partialstate.index];
    let newmoidx = Object.assign({}, partialstate.moduleindex);

    if (reset) {
        newmoidx[currentModuleId] = []; // reset
    } else {
        newmoidx[currentModuleId] = newmoidx[currentModuleId] || [];
    }

    if (modulizedObjs && modulizedObjs.length > 0) {

        for (let m of modulizedObjs) {
            let modid = m.moduleid;
            newmoidx[modid] = newmoidx[modid] || [];

            // Add missing index
            if (newmoidx[modid].indexOf(m.id) === -1) {
                newmoidx[modid].push(m.id);
            }

            if (newindex.indexOf(m.id) === -1) {
                newindex.push(m.id);
            }

            // Add or override
            newitems[m.id] = m;
        }
    }

    return {
        items: newitems,
        index: newindex,
        moduleindex: newmoidx,
        preloaded: false
    };

}

export default expand;