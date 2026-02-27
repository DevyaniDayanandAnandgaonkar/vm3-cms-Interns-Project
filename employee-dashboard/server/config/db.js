// const mysql = require("mysql2/promise");
// require("dotenv").config();

// const db = mysql.createConnection({
//   host:process.env.DB_HOST,
//   user:process.env.DB_USER,
//   password:process.env.DB_PASS,
//   database:process.env.DB_NAME
// });

// db.connect(err=>{
//  if(err) throw err;
//  console.log("MySQL Connected");
// });

// module.exports = db;
const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL Pool Created");

module.exports = db;