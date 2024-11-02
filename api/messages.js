const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: "postgres://default:5YpfusMB1hCr@ep-muddy-king-a4x9wkuw-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require", // Vercelの環境変数にDATABASE_URLを設定してください
});

async function saveMessage(content, username) {
  try {
    const query = 'INSERT INTO messages (content, username, timestamp) VALUES ($1, $2, NOW()) RETURNING *';
    const values = [content, username];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error saving message:', err);
  }
}

async function loadMessages() {
  try {
    const query = 'SELECT * FROM messages ORDER BY timestamp ASC';
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error('Error loading messages:', err);
    return [];
  }
}

module.exports = { saveMessage, loadMessages };
