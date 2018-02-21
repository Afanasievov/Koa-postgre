const knex = require('../connection');
const bcrypt = require('bcrypt');

const addUser = ({ username, password }) => {
  const salt = bcrypt.genSaltSync();
  // if !password then knex throw the notNullViolation exception
  const hash = password ? bcrypt.hashSync(password, salt) : null;

  return knex('Users')
    .insert({ password: hash, username })
    .returning('*');
};

module.exports = {
  addUser,
};
