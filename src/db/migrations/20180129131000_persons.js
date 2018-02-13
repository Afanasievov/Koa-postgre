exports.up = knex =>
  knex.schema.createTable('Persons', (table) => {
    table.increments();
    table.string('fName', 25);
    table.string('lName', 25);
    table.string('nick', 25);
    table.date('birthDate');
    table.text('info');
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('Persons');
