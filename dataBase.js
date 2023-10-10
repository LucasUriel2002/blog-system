// set DataBase

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("blog.db");

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY,
            title TEXT,
            text TEXT,
            author TEXT,
            timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
            views INTEGER DEFAULT 0,
            image_path TEXT
        )
    `);
});

module.exports = sqlite3;
