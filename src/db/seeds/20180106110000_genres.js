const genres = require('../../server/enums/genres.enum');

const entries = Object.values(genres);

exports.seed = knex =>
  knex('Genres')
    .del()
    .then(() => knex.batchInsert('Genres', entries));
