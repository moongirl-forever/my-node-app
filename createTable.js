const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE announcements (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        image_url TEXT,
        date DATE DEFAULT CURRENT_DATE,
        timestamp TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Table created!');
    process.exit();
  } catch (err) {
    console.error('❌ Error creating table:', err);
    process.exit(1);
  }
};

createTable();
