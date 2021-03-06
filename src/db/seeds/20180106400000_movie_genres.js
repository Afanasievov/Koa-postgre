
exports.seed = knex =>
  knex('MovieGenres')
    .del()
    .then(() => knex.batchInsert('MovieGenres', [
      { movieId: 1, genreId: 6 },
      { movieId: 1, genreId: 6 },
      { movieId: 1, genreId: 8 },
      { movieId: 2, genreId: 2 },
      { movieId: 2, genreId: 5 },
      { movieId: 2, genreId: 19 },
      { movieId: 2, genreId: 23 },
      { movieId: 3, genreId: 6 },
      { movieId: 3, genreId: 16 },
      { movieId: 3, genreId: 23 },
      { movieId: 4, genreId: 2 },
      { movieId: 4, genreId: 3 },
      { movieId: 4, genreId: 23 },
    ]));
