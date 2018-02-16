exports.up = knex =>
  knex.schema.createTable('Movies', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('year').notNullable();
    table.decimal('rating', 2, 1);
    table.text('info');
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('Movies');
