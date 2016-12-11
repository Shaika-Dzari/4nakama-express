'use strict';

module.exports = function ApiError(httpCode, message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.httpCode = httpCode || 500;
};

require('util').inherits(module.exports, Error);