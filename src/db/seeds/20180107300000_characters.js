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
    {
      fName: 'Castor',
      lName: 'Troy',
      nick: null,
      info: null,
    },
    {
      fName: 'Sean',
      lName: 'Archer',
      nick: null,
      info: null,
    },
    {
      fName: 'Devlin',
      lName: null,
      nick: null,
      info: null,
    },
    {
      fName: 'Alicia',
      lName: 'Huberman',
      nick: null,
      info: null,
    },
    {
      fName: 'John Patrick',
      lName: 'Mason',
      nick: null,
      info: null,
    },
    {
      fName: 'Stanley',
      lName: 'Goodspeed',
      nick: null,
      info: null,
    },
    {
      fName: 'Francis X.',
      lName: 'Hummel',
      nick: null,
      info: null,
    },
  ]));
