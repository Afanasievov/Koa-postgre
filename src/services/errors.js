const messages = require('../config/messages.js');
const codes = require('http-status-codes');

const showStack = process.env.NODE_ENV !== 'production';

class Err extends Error {
  constructor(message, cause, status, errorName) {
    super();
    let errors = [];

    if (typeof cause === 'string') {
      errors.push({ cause });
    }

    if (typeof cause === 'object') {
      errors.push(cause);
    }

    if (cause && Array.isArray(cause)) {
      errors = cause;
    }

    this.message = message || '';
    this.errors = showStack ? errors : [];
    this.code = (typeof status === 'number') ? status : codes.INTERNAL_SERVER_ERROR;
    this.error_name = errorName || '';
  }
}

class AuthError extends Err {
  constructor(message, cause, name) {
    super(message, cause, codes.UNAUTHORIZED, name);
  }
}

class ForbiddenError extends Err {
  constructor() {
    super(codes.getStatusText(codes.FORBIDDEN), null, codes.FORBIDDEN, 'forbidden');
  }
}

class ValidationError extends Err {
  constructor(message, cause) {
    super(message, cause, codes.BAD_REQUEST, 'bad_request');
  }
}

class NotFoundError extends Err {
  constructor() {
    super(messages.NOT_FOUND, null, codes.NOT_FOUND, 'not_found');
  }
}

module.exports = Err;
module.exports.AuthError = AuthError;
module.exports.ForbiddenError = ForbiddenError;
module.exports.ValidationError = ValidationError;
module.exports.NotFoundError = NotFoundError;
