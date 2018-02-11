const Router = require('koa-router');
const passport = require('koa-passport');
const queries = require('../db/queries/users');
const auth = require('../../services/auth');
const codes = require('http-status-codes');
const { versions, paths } = require('../../config/routes');

const router = new Router();
const baseUrl = `${paths.api}${versions.v1}${paths.auth}`;
const statuses = codes.getStatusText;

router.get(`${baseUrl}${paths.register}`, async (ctx) => {
  ctx.type = 'html';
  await ctx.render('register');
});

router.post(`${baseUrl}${paths.register}`, async (ctx) => {
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
});

router.get(`${baseUrl}${paths.status}`, async (ctx) => {
  if (auth.ensureAuthenticated(ctx)) {
    ctx.type = 'html';
    await ctx.render('status');
  } else {
    ctx.redirect(`${baseUrl}${paths.login}`);
  }
});

router.get(`${baseUrl}${paths.login}`, async (ctx) => {
  if (!auth.ensureAuthenticated(ctx)) {
    ctx.type = 'html';
    await ctx.render('login');
  } else {
    ctx.redirect(`${baseUrl}${paths.status}`);
  }
});

router.post(`${baseUrl}${paths.login}`, async ctx =>
  passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.redirect(`${baseUrl}${paths.status}`);
    } else {
      ctx.status = codes.BAD_REQUEST;
      ctx.body = { status: statuses(codes.BAD_REQUEST) };
    }
  })(ctx));

router.get(`${baseUrl}${paths.logout}`, async (ctx) => {
  if (auth.ensureAuthenticated(ctx)) {
    ctx.logout();
    ctx.redirect(`${baseUrl}${paths.login}`);
  } else {
    ctx.body = { success: false };
    ctx.throw(codes.UNAUTHORIZED);
  }
});

module.exports = router;
