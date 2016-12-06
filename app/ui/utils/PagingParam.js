function PagingParam(fromDate, direction, size) {
    this.fromDate = fromDate;
    this.direction = direction;
    this.size = size;
}

PagingParam.prototype.getFromDate = function() {
    return this.fromDate;
}

PagingParam.prototype.getDirection = function() {
    return this.direction;
}

PagingParam.prototype.getSize = function() {
    return this.size;
}

PagingParam.prototype.equals = function(other) {
    if (!other) {
        return true;
    }

    return this.fromDate == other.fromDate && this.direction == other.direction;
}

export default PagingParam;