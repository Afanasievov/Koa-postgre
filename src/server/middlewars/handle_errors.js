const logger = require('../services/logger');
const codes = require('http-status-codes');

module.exports = app =>
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || codes.INTERNAL_SERVER_ERROR;
      ctx.body = err;

      logger.error(err.message || err);
    }
  });
