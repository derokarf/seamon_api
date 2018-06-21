// Таблица со списком элементов карты - линии старта,
// финиша, буи, границы и т.д.
// {id, name, id_marker, id_race, timestamps}
exports.up = knex =>
  knex.schema.createTable('markers_race', table => {
    table.increments();
    table.text('name');
    // Тип элемента, список типов находится в отдельной таблице
    table.integer('id_marker');
    table.integer('id_race');
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('markers_race');
