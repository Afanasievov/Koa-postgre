const Err = require('../../services/errors');
const logger = require('../../services/logger');
const codeUnexpected = require('http-status-codes').INTERNAL_SERVER_ERROR;

module.exports = (err, req, res) => Promise.resolve()
  .then(() => {
    let error = err;

    if (!(err instanceof Err)) {
      error = new Err(err.message, err.stack, err.status, err.name);
    }

    logger.error(JSON.stringify(error));

    return error;
  })
  .then(error => res.status(error.status || error.code || codeUnexpected).send(error));
