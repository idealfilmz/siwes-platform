//  here the dtatabase will be handle effectively...


require('dotenv').config();
const mysql = require('mysql');


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

connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log({"connected": 'connected'});
  conn.release();
});


module.exports = connection;

