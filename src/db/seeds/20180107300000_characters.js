exports.seed = knex => knex('Characters')
  .del()
  .then(() => knex.batchInsert('Characters', [
    {
      fName: 'Rick',
      lName: 'Blaine',
      nick: null,
      info: null,
    },
    {
      fName: 'Ilsa',
      lName: 'Lund',
      nick: null,
      info: null,
    },
    {
      fName: 'Victor',
      lName: 'Laszlo',
      nick: null,
      info: null,
    },
  ]));
