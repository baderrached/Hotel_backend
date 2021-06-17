// lib/db.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'ahmed',
  password: 'rootroot'
});

connection.connect();
module.exports = connection;