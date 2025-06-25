const express = require('express');
const app = express();
const PORT = 3000;

// Make sure your static files can be accessed (HTML, CSS, JS)
app.use(express.static('public'));

// Example API route
app.get('/api/message', (req, res) => {
  res.json({ text: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
