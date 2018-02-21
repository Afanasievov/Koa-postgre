const codes = require('http-status-codes');
const passport = require('koa-passport');
const queries = require('../../db/queries/users');
const pgErrors = require('../config/pg_error_codes.config');

const statuses = codes.getStatusText;

const postRegister = async (ctx) => {
  try {
    await queries.addUser(ctx.request.body);

    return passport.authenticate('local', (err, user) => {
      if (user) {
        const result = Object.assign({}, user);

        delete result.password;
        ctx.login(user);
        ctx.status = codes.OK;
        ctx.body = result;
      } else {
        ctx.status = codes.UNAUTHORIZED;
        ctx.body = { message: statuses(codes.UNAUTHORIZED) };
      }
    })(ctx);
  } catch (error) {
    if (error.code === pgErrors.uniqueViolation || error.code === pgErrors.notNullViolation) {
      ctx.throw(codes.BAD_REQUEST, { error });
    }
  }

  return false;
};

const postLogin = async ctx =>
  passport.authenticate('local', (err, user) => {
    if (user) {
      const result = Object.assign({}, user);

      delete result.password;
      ctx.login(user);
      ctx.status = codes.OK;
      ctx.body = result;
    } else {
      ctx.status = codes.UNAUTHORIZED;
      ctx.body = { message: statuses(codes.UNAUTHORIZED) };
    }
  })(ctx);

const getLogout = (ctx) => {
  try {
    ctx.logout();
    ctx.status = codes.OK;
    ctx.body = { message: statuses(codes.OK) };
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  postRegister,
  postLogin,
  getLogout,
};
