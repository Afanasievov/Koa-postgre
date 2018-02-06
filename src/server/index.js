const Koa = require('koa');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const logger = require('./services/logger');
const session = require('koa-session');
const passport = require('koa-passport');

const indexRoutes = require('./routes/index');
const movieRoutes = require('./routes/movies');

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
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());

// server
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
});

module.exports = server;
