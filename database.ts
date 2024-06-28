// database.ts
import Database from 'better-sqlite3';

const db = new Database('database.db');

// Initialize the database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    balance REAL
  )
`);
db.exec(`
    CREATE TABLE IF NOT EXISTS option_trades (
        id INTEGER PRIMARY KEY,
        symbol TEXT,
        optionType TEXT,
        tradeType TEXT,
        strike REAL,
        expirationDate TEXT,
        quantity INTEGER,
        premium REAL,
        marketValue REAL,
        status TEXT,
        created_at TEXT,
        updated_at TEXT
    )
`);

export default db;
