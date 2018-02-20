const codes = require('http-status-codes');
const passport = require('koa-passport');
const queries = require('../../db/queries/users');

const statuses = codes.getStatusText;

const postRegister = async (ctx) => {
  await queries.addUser(ctx.request.body);

  return passport.authenticate('local', (err, user) => {
    if (user) {
      const result = Object.assign({}, user);

      delete result.password;
      ctx.login(user);
      ctx.status = codes.OK;
      ctx.body = result;
    } else {
      ctx.status = codes.BAD_REQUEST;
      ctx.body = { status: statuses(codes.BAD_REQUEST) };
    }
  })(ctx);
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
      ctx.body = { status: statuses(codes.UNAUTHORIZED) };
    }
  })(ctx);

const getLogout = (ctx) => {
  try {
    ctx.logout();
    ctx.status = codes.OK;
    ctx.body = { status: statuses(codes.OK) };
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  postRegister,
  postLogin,
  getLogout,
};
