exports.up = knex =>
  knex.schema.createTable('users', (table) => {
    table.uuid('id').notNullable().unique();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('users');
