// Таблица со списком координат элементов.
// {id, id_elem,lat,lng, i_point, timestamps}
exports.up = knex =>
  knex.schema.createTable('markers_points', table => {
    table.increments();
    table.integer('id_elem').notNullable();
    table.decimal('lat',9,6);
    table.decimal('lng',9,6);
    // Порядковый номер точки в подмассиве точек элемента
    table.integer('i_points');
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('markers_points');
