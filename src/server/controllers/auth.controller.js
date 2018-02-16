const codes = require('http-status-codes');
const passport = require('koa-passport');
const queries = require('../../db/queries/users');
const { versions, paths } = require('../../config/routes');
const auth = require('../../services/auth');

const statuses = codes.getStatusText;
const baseUrl = `${paths.api}${versions.v1}${paths.auth}`;

const getRegister = async (ctx) => {
  ctx.type = 'html';
  await ctx.render('register');
};

const postRegister = async (ctx) => {
  await queries.addUser(ctx.request.body);

  return passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.redirect(`${baseUrl}${paths.status}`);
    } else {
      ctx.status = codes.BAD_REQUEST;
      ctx.body = { status: statuses(codes.BAD_REQUEST) };
    }
  })(ctx);
};

const getStatus = async (ctx) => {
  if (auth.ensureAuthenticated(ctx)) {
    ctx.type = 'html';
    await ctx.render('status');
  } else {
    ctx.redirect(`${baseUrl}${paths.login}`);
  }
};

const getLogin = async (ctx) => {
  if (!auth.ensureAuthenticated(ctx)) {
    ctx.type = 'html';
    await ctx.render('login');
  } else {
    ctx.redirect(`${baseUrl}${paths.status}`);
  }
};

const postLogin = async ctx =>
  passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.redirect(`${baseUrl}${paths.status}`);
    } else {
      ctx.status = codes.BAD_REQUEST;
      ctx.body = { status: statuses(codes.BAD_REQUEST) };
    }
  })(ctx);

const getLogout = async (ctx) => {
  if (auth.ensureAuthenticated(ctx)) {
    ctx.logout();
    ctx.redirect(`${baseUrl}${paths.login}`);
  } else {
    ctx.body = { success: false };
    ctx.throw(codes.UNAUTHORIZED);
  }
};

module.exports = {
  getRegister,
  postRegister,
  getStatus,
  getLogin,
  postLogin,
  getLogout,
};
