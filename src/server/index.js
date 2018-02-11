const Koa = require('koa');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const RedisStore = require('koa-redis');

const loadRoutes = require('./routes');

const app = new Koa();

// sessions
app.keys = ['super-secret-key'];
app.use(session({
  store: new RedisStore(),
}, app));

// logger
app.use(koaLogger());

// body parser
app.use(bodyParser());

// authentication
require('./auth');

app.use(passport.initialize());
app.use(passport.session());

// routes
loadRoutes(app);

module.exports = app;
