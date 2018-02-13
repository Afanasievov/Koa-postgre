
exports.seed = knex =>
  knex('MovieCountries')
    .del()
    .then(() => knex.batchInsert('MovieCountries', [
      { movieId: 1, countryId: 236 },
      { movieId: 2, countryId: 236 },
      { movieId: 2, countryId: 235 },
      { movieId: 3, countryId: 236 },
      { movieId: 3, countryId: 235 },
      { movieId: 3, countryId: 233 },
    ]));
