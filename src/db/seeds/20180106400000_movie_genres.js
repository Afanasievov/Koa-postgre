
exports.seed = knex =>
  knex('MovieGenres')
    .del()
    .then(() => knex.batchInsert('MovieGenres', [
      { movieId: 1, genreId: 1 },
      { movieId: 2, genreId: 2 },
      { movieId: 2, genreId: 3 },
      { movieId: 3, genreId: 4 },
      { movieId: 3, genreId: 5 },
      { movieId: 3, genreId: 6 },
    ]));
