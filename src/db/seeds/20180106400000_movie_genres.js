
exports.seed = knex =>
  knex('MovieGenres')
    .del()
    .then(() => knex.batchInsert('MovieGenres', [
      { movieId: 1, genreId: 6 },
      { movieId: 1, genreId: 6 },
      { movieId: 1, genreId: 8 },
    ]));
