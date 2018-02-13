exports.seed = knex =>
  knex('Movies')
    .del()
    .then(() =>
      knex.batchInsert('Movies', [
        {
          name: 'The Land Before Time',
          year: 1980,
          rating: 7,
        },
        {
          name: 'Jurassic Park',
          year: 1981,
          rating: 9,
        },
        {
          name: 'Ice Age: Dawn of the Dinosaurs',
          year: 1982,
          rating: 5,
        },
      ]));
