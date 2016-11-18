const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_MAX_PAGE_SIZE = 30;

function PagingParser(req, pageSize) {
    var defaultSize = pageSize || DEFAULT_PAGE_SIZE;
    this._fromDate = req.query.fromdate;
    this._dir = req.query.dir || 'next';
    this._size = Math.min(req.query.size || defaultSize, DEFAULT_MAX_PAGE_SIZE);
    this._sort = req.query.sort || '-1';
    this._queryparams = {};

    if (this._fromDate) {
        this._queryparams.createdAt = this._dir == 'next' ? {$lt: new Date(this._fromDate)} : {$gt: new Date(this._fromDate)};
    }
}

PagingParser.prototype.params = function() {
    return this._queryparams;
}

PagingParser.prototype.merge = function(routeParams) {

    for(var k in this._queryparams) {
        if (!routeParams[k])
            routeParams[k] = this._queryparams[k];
    }

    return routeParams;
}

PagingParser.prototype.size = function() {
    return this._size;
}


PagingParser.prototype.sort = function() {
    return this._sort;
}

PagingParser.prototype.direction = function() {
    return this.dir;
}

module.exports = PagingParser;