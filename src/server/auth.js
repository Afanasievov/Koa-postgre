const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('./db/connection');

const options = {};

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => knex('users')
  .where({ id })
  .then(user => done(null, user))
  .catch(err => done(err, null)));

passport.use(new LocalStrategy(options, (username, password, done) => knex('users')
  .where({ username })
  .first()
  .then((user) => {
    if (user && password === user.password) {
      return done(null, user);
    }

    return done(null, false);
  })
  .catch(err => done(err))));
