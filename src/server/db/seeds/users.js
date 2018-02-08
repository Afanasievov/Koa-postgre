const uuidV4 = require('uuid/v4');
const bcrypt = require('bcrypt');

exports.seed = (knex, Promise) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('johnson', salt);

  return knex('users')
    .del()
    .then(() => Promise
      .join(knex('users')
        .insert({
          id: uuidV4(),
          password: hash,
          username: 'jeremy',
        })));
};
