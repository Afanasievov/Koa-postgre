exports.up = knex =>
  knex.schema.createTable('UserPrivileges', (table) => {
    table.increments();
    table.integer('userId').notNullable();
    table.integer('privilegeId').notNullable();

    table.foreign('userId')
      .references('id')
      .inTable('Users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('privilegeId')
      .references('id')
      .inTable('Privileges')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTable('UserPrivileges');
