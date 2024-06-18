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

export default db;
