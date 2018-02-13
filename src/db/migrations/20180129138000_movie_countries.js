exports.up = knex =>
  knex.schema.createTable('MovieCountries', (table) => {
    table.increments();
    table.integer('movieId').notNullable();
    table.integer('countryId').notNullable();

    table.foreign('movieId')
      .references('id')
      .inTable('Movies')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('countryId')
      .references('id')
      .inTable('Countries')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTable('MovieCountries');
