const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let signIns = []; // This will hold all sign-in names

app.post('/signin', (req, res) => {
  const name = req.body.name;
  if (name) {
    signIns.push({ name, timestamp: new Date() });
    res.status(200).json({ message: 'Signed in!' });
  } else {
    res.status(400).json({ message: 'Name required.' });
  }
});

app.get('/signin', (req, res) => {
  res.json(signIns);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
