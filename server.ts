// server.ts
import express from 'express';
import cors from 'cors';
import db from './database';
import { DB_HOST, DB_PORT } from '$lib/utils/db-info';

const app = express();


// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5174' // Replace with your SvelteKit frontend's origin
}));

app.use(express.json());

app.get('/api/trading_accounts', (req, res) => {
  const stmt = db.prepare('SELECT * FROM trading_accounts');
  const accounts = stmt.all();
  res.json({ data: accounts });
});

app.post('/api/trading_accounts', (req, res) => {
  const { name, cash, asset, created_at, updated_at } = req.body;
  const stmt = db.prepare('INSERT INTO trading_accounts (name, cash, asset, created_at, updated_at) VALUES (?, ?, ?, ?, ?)');
  const result = stmt.run(name, cash, asset, created_at, updated_at);
  res.json({ id: result.lastInsertRowid });
});

app.get('/api/option_trades', (req, res) => {
  
  const createdAt = req.query.created_at;
  let trades = [];
  if(createdAt) {
    console.log("find trades createdAt", createdAt);
    const stmt = db.prepare('SELECT * FROM option_trades WHERE DATE(created_at) == DATE(?)');
    trades = stmt.all(createdAt);
  } else {
    const stmt = db.prepare('SELECT * FROM option_trades');
    trades = stmt.all();
  }
  
  console.log("GET to /api/option_trades", req.query, trades);
  res.json({ data: trades });
});

app.post('/api/option_trades', (req, res) => {
  const { symbol,  optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status, accountId, created_at, updated_at } = req.body;
  console.log("POST to /api/option_trades", req.body);
  const stmt = db.prepare(`INSERT INTO option_trades (symbol,  optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status, accountId, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const result = stmt.run(symbol,  optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status, accountId, created_at, updated_at);
  res.json({ id: result.lastInsertRowid });
});

// add a route to delete a option trade
app.delete('/api/option_trades/:id', (req, res) => {
  const { id } = req.params;
  console.log("DELETE to /api/option_trades", id);
  const stmt = db.prepare('DELETE FROM option_trades WHERE id = ?');
  const result = stmt.run(id);
  res.json({ id: result.lastInsertRowid });
});

app.put('/api/option_trades/:id', (req, res) => {
  const { id } = req.params;
  const { symbol,  optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status, created_at, updated_at } = req.body;
  console.log("PUT to /api/option_trades", req.body);
  const stmt = db.prepare(`UPDATE option_trades SET symbol = ?,  optionType = ?, tradeType = ?, strike = ?, expirationDate = ?, quantity = ?, premium = ?, marketValue = ?, status = ?, created_at = ?, updated_at = ? WHERE id = ?`);
  const result = stmt.run(symbol,  optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status, created_at, updated_at, id);
  res.json({ id: result.lastInsertRowid });
  }
);

app.get('/api/trading_accounts/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('SELECT * FROM trading_accounts WHERE id = ?');
  const account = stmt.get(id);
  res.json({ data: account });
});

app.put('/api/trading_accounts/:id', (req, res) => {
  const { id } = req.params;
  const { name, cash, asset, created_at, updated_at } = req.body;
  console.log("PUT to /api/trading_accounts", req.body);
  const stmt = db.prepare(`UPDATE trading_accounts SET name = ?, cash = ?, asset = ?, created_at = ?, updated_at = ? WHERE id = ?`);
  const result = stmt.run(name, cash, asset, created_at, updated_at, id);
  res.json({ id: result.lastInsertRowid });
  } 
);

app.listen(DB_PORT, () => {
  console.log(`Server running at ${DB_HOST}:${DB_PORT}/`);
});
