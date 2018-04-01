// const environment = process.env.NODE_ENV || 'development';
// const config = require('./knexfile.js')[environment];
const knex = require('knex')({
  client: 'pg',
  debug: false,
  connection: {
    host: '10.0.10.182',
    database: 'gpsmon',
    user: 'gpsmon',
    password: 'd41d8cd98',
    charset: 'utf8'
  }
});

module.exports = require('bookshelf')(knex);
