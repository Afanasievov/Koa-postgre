const countries = require('../../enums/countries.enum');

const entries = Object.values(countries);

exports.seed = knex =>
  knex('Countries')
    .del()
    .then(() => knex.batchInsert('Countries', entries));

