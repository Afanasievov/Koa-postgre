const Koa = require('koa');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const logger = require('../services/logger');
const session = require('koa-session');
const passport = require('koa-passport');

const loadRoutes = require('./routes');

const app = new Koa();
const PORT = 1337;

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));

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


// server
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
});

module.exports = server;
