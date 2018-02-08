const knex = require('../connection');
const uuidV4 = require('uuid/v4');

const addUser = ({ username, password }) => knex('users')
  .insert({ id: uuidV4(), username, password })
  .returning('*');

module.exports = {
  addUser,
};
