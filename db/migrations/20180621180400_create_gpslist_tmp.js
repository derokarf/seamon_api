// {id, type, IMEI, ttdd, lat, lng, speed, course, isValidGPS, timestamps}
// Таблица для записи координат от незарегистрированных трекеров
// ВАЖНО!!! После регистрации координаты записи от зарегистрированного трекера
// удаляются
exports.up = knex =>
  knex.schema.createTable('gpslist_tmp', table => {
    table.increments();
    table.text('type');
    table.bigInteger('imei').notNullable();
    table.integer('ttdd');
    table.decimal('lat',9,6);
    table.decimal('lng',9,6);
    table.float('speed');
    table.float('course');
    table.boolean('isvalidgps');
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('gpslist_tmp');
