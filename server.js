const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
require('dotenv').config();

// ✅ Use Render’s provided port or default to 3000 locally
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.static('public'));
app.use(express.json());

let signIns = [];

// ✅ PostgreSQL connection (Render-hosted)
const pool = new Pool({
  connectionString: 'postgresql://keyclub_database_user:c2LmQmambJcB6kKFHUrwpaK5RbdjhJVF@dpg-d1hddpvgi27c739lipb0-a.oregon-postgres.render.com/keyclub_database?ssl=true',
  ssl: { rejectUnauthorized: false }
});

// ✅ API route: handle name submissions
app.post('/signin', (req, res) => {
  const name = req.body.name;
  if (name) {
    signIns.push({ name, timestamp: new Date() });
    res.status(200).json({ message: 'Signed in!' });
  } else {
    res.status(400).json({ message: 'Name required.' });
  }
});

// ✅ API route: show all sign-ins
app.get('/signin', (req, res) => {
  res.json(signIns);
});

// ✅ API route: add a new announcement
app.post('/announcements', async (req, res) => {
  const { message, image_url } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO announcements (message, image_url) VALUES ($1, $2) RETURNING *',
      [message, image_url]
    );
    res.status(201).json({ success: true, announcement: result.rows[0] });
  } catch (err) {
    console.error('❌ Error inserting announcement:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// ✅ Serve the custom sign-in page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.delete('/announcements/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM announcements WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error deleting announcement:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/announcements', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM announcements ORDER BY timestamp DESC');
    res.json({ success: true, announcements: result.rows });
  } catch (err) {
    console.error('❌ Error fetching announcements:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
