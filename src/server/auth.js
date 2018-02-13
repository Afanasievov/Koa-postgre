const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../db/connection');
const bcrypt = require('bcrypt');

const options = {};
const comparePass = (userPassword, databasePassword) =>
  bcrypt.compareSync(userPassword, databasePassword);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => knex('users')
  .where({ id })
  .then(user => done(null, user))
  .catch(err => done(err, null)));

passport.use(new LocalStrategy(options, (username, password, done) => knex('users')
  .where({ username })
  .first()
  .then(user => done(null, comparePass(password, user.password) ? user : null))
  .catch(err => done(err))));
