function normalize(response) {

    let list = {};
    let idx = [];

    if (response && Array.isArray(response)) {
        response.forEach(i => {
            let id = i.id;
            list[id] = i;
            idx.push(id);
        });
    }

    return {
        items: list,
        index: idx
    }
}

module.exports = normalize;