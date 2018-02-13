exports.up = knex =>
  knex.schema.createTable('Users', (table) => {
    table.increments();
    table.string('username', 20).notNullable().unique();
    table.string('fName', 25);
    table.string('lName', 25);
    table.string('email', 25);
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('Users');
