
exports.seed = knex =>
  knex('MovieCountries')
    .del()
    .then(() => knex.batchInsert('MovieCountries', [
      { movieId: 1, countryId: 236 },
    ]));
