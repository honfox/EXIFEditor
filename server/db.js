const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'users.db'));

// 创建用户表
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now', 'localtime'))
    )
`);

// 查找用户
const findUserByUsername = db.prepare('SELECT * FROM users WHERE username = ?');

// 创建用户
const createUser = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');

module.exports = { db, findUserByUsername, createUser };
