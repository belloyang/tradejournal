// database.ts
import Database from 'better-sqlite3';

const db = new Database('database.db');

// Initialize the database
db.exec(`
  CREATE TABLE IF NOT EXISTS trading_accounts (
    id INTEGER PRIMARY KEY,
    name TEXT,
    cash REAL,
    asset REAL,
    created_at TEXT,
    updated_at TEXT
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
        accountId INTEGER,
        created_at TEXT,
        updated_at TEXT
    )
`);

export default db;
