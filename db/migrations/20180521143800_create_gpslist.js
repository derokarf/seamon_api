// {id, IMEI, ttdd, lat, lng, speed, course, isValidGPS, timestamps}
exports.up = knex =>
  knex.schema.createTable('gpslist', table => {
    table.increments();
    table.integer('gadget').references('id').inTable('gadgets');
    table.bigInteger('ttdd');
    table.decimal('lat',9,4);
    table.decimal('lng',9,4);
    table.float('speed');
    table.float('course');
    table.boolean('isvalidgps');
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('gpslist');
