const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.VERCEL_POSTGRESQL_URL,
});

async function saveMessage(name, message) {
  const query = `INSERT INTO messages (name, content) VALUES ($1, $2) RETURNING *`;
  const values = [name, message];
  const res = await pool.query(query, values);
  return res.rows[0];
}

async function getMessages() {
  const query = `SELECT * FROM messages ORDER BY created_at DESC LIMIT 50`;
  const res = await pool.query(query);
  return res.rows;
}

module.exports = { saveMessage, getMessages };
