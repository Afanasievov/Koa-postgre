exports.up = knex =>
  knex.schema.createTable('Characters', (table) => {
    table.increments();
    table.string('fName', 25);
    table.string('lName', 25);
    table.string('nick', 25);
    table.text('info');
  });

exports.down = knex => knex.schema.dropTable('Characters');
