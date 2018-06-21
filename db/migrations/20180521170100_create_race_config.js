// Таблица привязке трекера и лодки к определенной гонке
// {id, id_race, id_boat, id_gadget, about, timestamps}
exports.up = knex =>
  knex.schema.createTable('race_config', table => {
    table.increments();
    table.integer('id_race').references('id').inTable('races');
    table.integer('id_boat').references('id').inTable('boats');
    table.integer('id_gadget').references('id').inTable('gadgets');
    // Статус лодки на гонку - участик, наблюдатель, судья и т.д.
    // Статусы хранятся в отдельной таблице
    table.integer('id_status');
    table.text('about');
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('race_config');
