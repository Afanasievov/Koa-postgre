
exports.seed = knex =>
  knex('MovieCountries')
    .del()
    .then(() => knex.batchInsert('MovieCountries', [
      { movieId: 1, countryId: 236 },
      { movieId: 2, countryId: 236 },
      { movieId: 3, countryId: 236 },
      { movieId: 4, countryId: 236 },
    ]));
