//{id, name, begin, end, start, finish, about, location, timestamps}
exports.up = knex =>
  knex.schema.createTable('races', table => {
    table.increments(); // Уникальный номер гонки, связь с комплектом таблиц гонки
    table.text('name');
    // С этого значения треки с устройств, привязанных к гонке начинают
    // отображаться на карте
    table.bigInteger('begin');
    // После этого времени треки не отображаются для текущей гонки
    table.bigInteger('end');
    table.bigInteger('start');
    table.bigInteger('finish');
    table.text('location');
    table.text('about');
    table.timestamps();
  });

exports.down = knex =>
 knex.schema.dropTable('races');
