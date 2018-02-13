exports.up = knex =>
  knex.schema.createTable('MoviePersons', (table) => {
    table.increments();
    table.integer('movieId').notNullable();
    table.integer('personId').notNullable();
    table.integer('positionId').notNullable();
    table.integer('characterId');

    table.foreign('movieId')
      .references('id')
      .inTable('Movies')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('personId')
      .references('id')
      .inTable('Persons')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('positionId')
      .references('id')
      .inTable('Positions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('characterId')
      .references('id')
      .inTable('Characters')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTable('MoviePersons');
