// database.ts
import Database from 'better-sqlite3';

const db = new Database(':memory:');

// Initialize the database
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT
  )
`);
db.exec(`
    CREATE TABLE option_trades (
        id INTEGER PRIMARY KEY,
        symbol TEXT,
        quantity INTEGER,
        premium REAL,
        strike REAL,
        expirationDate TEXT,
        optionType TEXT,
        tradeType TEXT,
        status TEXT,
        created_at TEXT,
        updated_at TEXT
    )
`);

db.exec(`
    INSERT INTO option_trades (symbol, quantity, premium, strike, expirationDate, optionType, tradeType, status, created_at, updated_at) VALUES 
    ('AAPL', 1, 100, 150, '2022-01-01', 'CALL', 'BUY', 'OPEN', '2021-01-01', '2021-01-01')
`);

export default db;
