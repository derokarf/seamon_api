// const db = 'gpsmon';
// const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    debug: false,
    connection: {
      host: 'hydro.lin.irk.ru',
      database: 'gpsmon',
      user: 'gpmon',
      password: 'd41d8cd98',
      charset: 'utf8'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    }
  }
};
