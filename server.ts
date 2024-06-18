// server.ts
import express from 'express';
import db from './database';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/users', (req, res) => {
  const stmt = db.prepare('SELECT * FROM users');
  const users = stmt.all();
  res.json({ data: users });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  const result = stmt.run(name, email);
  res.json({ id: result.lastInsertRowid });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
