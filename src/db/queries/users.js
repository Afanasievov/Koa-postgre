const knex = require('../connection');
const bcrypt = require('bcrypt');

const addUser = ({ username, password }) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return knex('Users')
    .insert({ password: hash, username })
    .returning('*');
};

module.exports = {
  addUser,
};
