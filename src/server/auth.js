const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../db/connection');
const bcrypt = require('bcrypt');

const options = {};
const comparePass = (userPassword, databasePassword) =>
  bcrypt.compareSync(userPassword, databasePassword);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => knex('Users')
  .where({ id: 6 })
  .then(data => done(null, data))
  .catch(err => done(err, null)));

passport.use(new LocalStrategy(options, (username, password, done) => knex('Users')
  .where({ username })
  .first()
  .then(user => done(null, comparePass(password, user.password) ? user : null))
  .catch(err => done(err))));
