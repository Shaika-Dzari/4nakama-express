const expand = (partialstate, modulizedObjs) => {
    let newState = Object.assign({}, partialstate);

    newState.index = newState.index || [];
    newState.moduleindex = newState.moduleindex || {};


    if (modulizedObjs && modulizedObjs.length > 0) {

        for (let m of modulizedObjs) {
            let modid = m.moduleid;
            newState.moduleindex[modid] = newState.moduleindex[modid] || [];

            // Add missing index
            if (newState.moduleindex[modid].indexOf(m.id) === -1) {
                newState.moduleindex[modid].push(m.id);
            }

            if (newState.index.indexOf(m.id) === -1) {
                newState.index.push(m.id);
            }

            // Add or override
            newState.items[m.id] = m;
        }
    }

    newState.preloaded = false;
    return newState;
}

export default expand;