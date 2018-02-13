const bcrypt = require('bcrypt');

exports.seed = (knex) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('johnson', salt);

  return knex('Users')
    .del()
    .then(() => knex.batchInsert('Users', [
      {
        password: hash,
        username: 'jer',
        fName: 'Jeremy',
        lName: 'Johnson',
        email: 'jjohns@mail.com',
      },
    ]));
};
