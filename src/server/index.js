const Koa = require('koa');
const handleErrors = require('./middlewars/handle_errors');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const store = require('./session');

const loadRoutes = require('./routes');

const app = new Koa();

// error handling
handleErrors(app);

// sessions
app.keys = ['super-secret-key'];
app.use(session({ store }, app));

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
