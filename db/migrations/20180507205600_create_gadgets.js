// Schema {id, imei, phone, name, about, type}
exports.up = knex =>
  knex.schema.createTable('gadgets', table => {
    table.increments();
    table.bigInteger('imei').notNullable();
    table.text('phone'); // Текст, потому что номера могут начинаться с нулей
    table.text('name').notNullable();
    table.text('about');
    table.text('type'); // Тип трекера (модель, телефон, не телефон и т.д.)
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('gadgets');
