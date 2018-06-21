const db = 'gpsmon';
const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    debug: false,
    connection: {
      host: 'localhost',
      database: `${db}_dev`,
      user: 'gpsmon',
      // Подумать как отказаться от хранения пароля в открытом виде в релизе
      password: 'd41d8cd98',
      charset: 'utf8'
    },
    migrations: {
      directory: path.join('..', 'db', 'migrations')
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
