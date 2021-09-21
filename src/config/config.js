
const dotenv = require("dotenv");
const path = require('path')
// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const env = process.env;
const x = { // for connecting to the development or test database
  development: {
    database: env.DB_NAME,
    port: env.DB_PORT,
    host: env.DB_HOST,
  },
  test: {
    database: env.DB_NAME,
    port: env.DB_PORT,
    host: env.DB_HOST,
  },
  production: { // for production database server 
    database: env.DB_NAME,
    port:  env.DB_PORT,
    host: '123.123.123.123', // for production host
  },
};
module.exports = x;