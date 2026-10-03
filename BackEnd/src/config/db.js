const { Pool, types } = require("pg");

// نرجّع التواريخ (DATE) كنص مثل 2026-12-31 حتى ما ينقص يوم بسبب فرق التوقيت
types.setTypeParser(1082, (value) => value);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;