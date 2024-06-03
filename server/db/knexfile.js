const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { DB_CLIENT, DB_NAME, DB_USER, DB_PASSWORD } = process.env

module.exports = {
  development: {
    client: DB_CLIENT,
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'schema_migrations'
    }
  }
};