exports.up = knex =>
  knex.schema.createTable('Positions', (table) => {
    table.increments();
    table.string('name', 25).notNullable();
  });

exports.down = knex => knex.schema.dropTable('Positions');
