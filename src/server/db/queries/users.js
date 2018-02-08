const knex = require('../connection');
const bcrypt = require('bcrypt');
const uuidV4 = require('uuid/v4');

const addUser = ({ username, password }) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return knex('users')
    .insert({ id: uuidV4(), password: hash, username })
    .returning('*');
};

module.exports = {
  addUser,
};
