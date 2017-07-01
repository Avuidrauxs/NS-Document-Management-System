require('dotenv').config();

module.exports = {
  development: {
    username: 'Avuidrauxs',
    password: null,
    database: 'nsdms-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_TEST_URL'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
