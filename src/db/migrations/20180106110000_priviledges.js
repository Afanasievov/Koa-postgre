exports.up = knex =>
  knex.schema.createTable('Privileges', (table) => {
    table.increments();
    table.string('name', 25).notNullable().unique();
  });

exports.down = knex => knex.schema.dropTable('Privileges');
