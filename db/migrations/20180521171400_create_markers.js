// Таблица со списком типов элементов
// {id, name, about, points, timestamps}
exports.up = knex =>
  knex.schema.createTable('markers', table => {
    table.increments();// Тип маркера - буй, линия и т.д.
    table.text('name');
    table.text('about');
    // Количество точек на карте для элемента
    table.integer('points').notNullable();
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('markers');
