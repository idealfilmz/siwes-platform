require('dotenv').config();

const result = require('dotenv').config();
if (result.error) {
    throw result.error;
}

const mysql = require('mysql');

console.log("using host ...", 'HOST:', process.env.HOST);

console.log("and user .....", 'USER:', process.env.USER);
console.log('PASSWORD:', process.env.PASSWORD);
console.log('DATABASE:', process.env.DATABASE);

const connection = mysql.createPool({
  connectionLimit: 10000,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectTimeout: 3000000, 
  acquireTimeout: 3000000,
  timeout: 3000000
});

module.exports = connection;
