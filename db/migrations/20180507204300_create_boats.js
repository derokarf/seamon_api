exports.up = knex =>
  knex.schema.createTable('boats', table => {
    table.increments();
    table.text('name').notNullable();
    table.text('type');
    table.text('about');
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('boats');
