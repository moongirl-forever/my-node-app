const { Pool } = require('pg');

// Direct connection string to Render DB with SSL
const pool = new Pool({
  connectionString: 'postgresql://keyclub_database_user:c2LmQmambJcB6kKFHUrwpaK5RbdjhJVF@dpg-d1hddpvgi27c739lipb0-a.render.com/keyclub_database?ssl=true',
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
