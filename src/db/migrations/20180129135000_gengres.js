exports.up = knex =>
  knex.schema.createTable('Genres', (table) => {
    table.increments();
    table.string('name', 25).notNullable();
  });

exports.down = knex => knex.schema.dropTable('Genres');
