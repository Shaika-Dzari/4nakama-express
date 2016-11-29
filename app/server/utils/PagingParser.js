const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_MAX_PAGE_SIZE = 30;

function PagingParser(req, pageSize) {
    var defaultSize = pageSize || DEFAULT_PAGE_SIZE;
    var size = req.query.size || defaultSize;
    var sort = req.query.sort || 'desc';

    if (!(size > 0)) {
        size = defaultSize
    }

    if (sort != 'asc' && sort != 'desc') {
        sort = 'desc';
    }

    this._params = {
        createdat: req.query.fromdate ? new Date(req.query.fromdate) : new Date(),
        direction: !req.query.dir || req.query.dir == 'next' ? 'next' : 'prev',
        size: Math.min(size || defaultSize, DEFAULT_MAX_PAGE_SIZE),
        sort: sort
    };
}

PagingParser.prototype.params = function() {
    return this._params;
}

PagingParser.prototype.merge = function(routeParams, override) {

    for(var k in this._params) {
        if (override || !routeParams[k])
            routeParams[k] = this._params[k];
    }

    return routeParams;
}

PagingParser.prototype.size = function() {
    return this._params.size;
}


PagingParser.prototype.sort = function() {
    return this._params.sort;
}

PagingParser.prototype.direction = function() {
    return this._params.direction;
}

module.exports = PagingParser;