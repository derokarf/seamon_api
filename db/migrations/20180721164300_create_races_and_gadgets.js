// {id, id_tracker,id_race, timestamps, about}
// Таблица соответствия трекера гонке, один трекер в момент времени
// может быть назначен одной гонке
exports.up = knex =>
  knex.schema.createTable('races_and_gadgets', table => {
    table.increments();
    table.integer('id_daget');
    table.integer('id_race');
    table.text('about');
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('races_and_gadgets');
