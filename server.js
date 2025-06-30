const express = require('express');
const path = require('path');
const app = express();

// ✅ Use Render’s provided port or default to 3000 locally
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.static('public'));
app.use(express.json());

let signIns = [];

//  API route: handle name submissions
app.post('/signin', (req, res) => {
  const name = req.body.name;
  if (name) {
    signIns.push({ name, timestamp: new Date() });
    res.status(200).json({ message: 'Signed in!' });
  } else {
    res.status(400).json({ message: 'Name required.' });
  }
});

//  API route: show all sign-ins
app.get('/signin', (req, res) => {
  res.json(signIns);
});

//  Serve the custom sign-in page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

//  Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
