const Koa = require('koa');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const store = require('./session');
const views = require('koa-views');
const { NotFoundError } = require('../services/errors');
const errorHandler = require('./middlewars/error_handling');

const loadRoutes = require('./routes');

const app = new Koa();

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

// views
app.use(views(`${__dirname}/views`, { extension: 'pug' }));

// routes
loadRoutes(app);

// errors
app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

module.exports = app;
