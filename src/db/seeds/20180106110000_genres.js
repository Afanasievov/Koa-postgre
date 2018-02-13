const genres = require('../../enums/genres.enum');

const entries = Object.values(genres);

exports.seed = knex =>
  knex('Genres')
    .del()
    .then(() => knex.batchInsert('Genres', entries));
