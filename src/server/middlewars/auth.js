const codes = require('http-status-codes');

const ensureAuthenticated = (context, next) => {
  try {
    if (context.isAuthenticated()) {
      return next();
    }

    return context.throw(codes.UNAUTHORIZED);
  } catch (err) {
    return context.throw(err);
  }
};

module.exports = {
  ensureAuthenticated,
};
