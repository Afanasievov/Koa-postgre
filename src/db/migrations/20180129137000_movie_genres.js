exports.up = knex =>
  knex.schema.createTable('MovieGenres', (table) => {
    table.increments();
    table.integer('movieId').notNullable();
    table.integer('genreId').notNullable();

    table.foreign('movieId')
      .references('id')
      .inTable('Movies')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('genreId')
      .references('id')
      .inTable('Genres')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTable('MovieGenres');
