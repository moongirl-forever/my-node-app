const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log("🔍 DATABASE_URL:", process.env.DATABASE_URL);


const { Pool } = require('pg');
require('dotenv').config();

console.log("🔍 DATABASE_URL:", process.env.DATABASE_URL);


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
