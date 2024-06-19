// server.ts
import express from 'express';
import cors from 'cors';
import db from './database';
import { DB_HOST, DB_PORT } from '$lib/utils/db-host';

const app = express();


// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5174' // Replace with your SvelteKit frontend's origin
}));

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

app.get('/api/option_trades', (req, res) => {
  const stmt = db.prepare('SELECT * FROM option_trades');
  const users = stmt.all();
  res.json({ data: users });
});

app.post('/api/option_trades', (req, res) => {
  const { symbol,  optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status } = req.body;
  console.log("POST to /api/option_trades", req.body);
  const stmt = db.prepare(`INSERT INTO option_trades (symbol,  optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const result = stmt.run(symbol,  optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status);
  res.json({ id: result.lastInsertRowid });
});

app.listen(DB_PORT, () => {
  console.log(`Server running at ${DB_HOST}:${DB_PORT}/`);
});
