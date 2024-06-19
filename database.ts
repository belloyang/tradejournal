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

db.exec(`
    INSERT INTO option_trades (symbol, optionType, tradeType, strike, expirationDate, quantity, premium, marketValue, status, created_at, updated_at) VALUES 
    ('AAPL', 'CALL', 'BUY', 150, '2022-01-01', 1, 100,100, 'OPEN', '2021-01-01', '2021-01-01')
`);

export default db;
