const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const queries = require('../db/queries/users');
const codes = require('http-status-codes');
const { versions, paths } = require('../../config/routes');

const router = new Router();
const baseUrl = `${paths.api}${versions.v1}${paths.auth}`;
const statuses = codes.getStatusText;

router.get(`${baseUrl}${paths.register}`, async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./src/server/views/register.html');
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
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/status.html');
  } else {
    ctx.redirect(`${baseUrl}${paths.login}`);
  }
});

router.get(`${baseUrl}${paths.login}`, async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/login.html');
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
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect(`${baseUrl}${paths.login}`);
  } else {
    ctx.body = { success: false };
    ctx.throw(codes.UNAUTHORIZED);
  }
});

module.exports = router;
