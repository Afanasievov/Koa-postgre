exports.up = knex =>
  knex.schema.createTable('Countries', (table) => {
    table.increments();
    table.string('name', 50).notNullable();
    table.string('code', 2).notNullable();
  });

exports.down = knex => knex.schema.dropTable('Countries');
