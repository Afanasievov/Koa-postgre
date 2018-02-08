const uuidV4 = require('uuid/v4');

exports.seed = (knex, Promise) => knex('users')
  .del()
  .then(() => Promise
    .join(knex('users')
      .insert({
        id: uuidV4(),
        username: 'jeremy',
        password: 'johnson',
      })));
