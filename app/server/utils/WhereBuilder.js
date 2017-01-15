function WhereBuilder() {
    this.whereStr = [];
    this.parameters = {};
}

WhereBuilder.prototype.add = function(table, key, value, equalityOp) {
    if (table && key) {
        equalityOp = equalityOp || '=';
        this.whereStr.push(table + '.' + key);
        this.whereStr.push(equalityOp);
        this.whereStr.push('$(' + key + ')');

        this.parameters[key] = value;

    }
    return this;
}

WhereBuilder.prototype.and = function(table, key, value, equalityOp) {
    if (table && key && value) {
        this.whereStr.push('and');
        this.add(table, key, value, equalityOp);
    }
    return this;
}

WhereBuilder.prototype.or = function(table, key, value, equalityOp) {
    if (table && key && value) {
        this.whereStr.push('or');
        this.add(table, key, value, equalityOp);
    }
    return this;
}

WhereBuilder.prototype.with = function(key, value) {
    this.parameters[key] = value;
    return this;
}

WhereBuilder.prototype.group = function() {
    this.whereStr.push('(');
    return this;
}

WhereBuilder.prototype.end = function() {
    this.whereStr.push(')');
    return this;
}

WhereBuilder.prototype.build = function(query) {

    if (query) {
        let q = query.replace('__WHERE__', ' where ' + this.whereStr.join(' '));
        return q;
    }

    return null;
}

WhereBuilder.prototype.params = function() {
    return this.parameters;
}

module.exports = WhereBuilder;