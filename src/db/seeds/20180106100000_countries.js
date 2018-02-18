const countries = require('../../server/enums/countries.enum');

const entries = Object.values(countries);

exports.seed = knex =>
  knex('Countries')
    .del()
    .then(() => knex.batchInsert('Countries', entries));

