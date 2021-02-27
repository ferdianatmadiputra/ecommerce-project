let env = process.env.NODE_ENV || "development"
if (env == "development" || env == "test") {
  require('dotenv').config();
}
// console.log(process.env.NODE_ENV)

module.exports = {
  "development": {
    "username": process.env.CONFIG_DEV_USERNAME,
    "password": process.env.CONFIG_DEV_PASSWORD,
    "database": process.env.CONFIG_DEV_DATABASE,
    "host": process.env.CONFIG_DEV_HOST,
    "dialect": process.env.CONFIG_DEV_DIALECT,
  },
  "test": {
    "username": process.env.CONFIG_TEST_USERNAME,
    "password": process.env.CONFIG_TEST_PASSWORD,
    "database": process.env.CONFIG_TEST_DATABASE,
    "host": process.env.CONFIG_TEST_HOST,
    "dialect": process.env.CONFIG_TEST_DIALECT,
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}