const positions = require('../../enums/positions.enum');

const entries = Object.values(positions);

exports.seed = knex =>
  knex('Positions')
    .del()
    .then(() => knex.batchInsert('Positions', entries));
