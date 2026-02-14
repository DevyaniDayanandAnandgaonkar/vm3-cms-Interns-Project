// config/db.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  // host: process.env.DB_HOST,
  host: "localhost",
  user: "root",
  port: 3306,
  password: "root",
  database: "vm3_updated",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((conn) => {
    console.log("✅ MySQL connected");
    conn.release();
  })
  .catch((err) => console.error("❌ MySQL connection failed:", err));

module.exports = pool;
