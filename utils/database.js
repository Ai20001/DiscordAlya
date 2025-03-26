const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Убедимся, что папка data существует
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const db = new sqlite3.Database(path.join(dataDir, 'bot.db'));

// Инициализация таблиц
db.serialize(() => {
    // Таблица пользователей
    db.run(`CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        balance INTEGER DEFAULT 1000,
        xp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        last_daily TIMESTAMP
    )`);

    // Таблица настроек сервера
    db.run(`CREATE TABLE IF NOT EXISTS guild_settings (
        guild_id TEXT PRIMARY KEY,
        prefix TEXT DEFAULT '!',
        welcome_channel TEXT,
        log_channel TEXT,
        music_channel TEXT
    )`);

    // Таблица инвентаря
    db.run(`CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        item_id TEXT,
        quantity INTEGER DEFAULT 1,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`);
});

// Методы для работы с пользователями
const users = {
    async get(userId) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE user_id = ?', [userId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    async create(userId) {
        return new Promise((resolve, reject) => {
            db.run('INSERT OR IGNORE INTO users (user_id) VALUES (?)', [userId], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },

    async updateBalance(userId, amount) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE users SET balance = balance + ? WHERE user_id = ?', [amount, userId], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },

    async addXP(userId, xp) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE users SET xp = xp + ? WHERE user_id = ?', [xp, userId], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
};

// Методы для работы с настройками сервера
const guildSettings = {
    async get(guildId) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM guild_settings WHERE guild_id = ?', [guildId], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    async update(guildId, settings) {
        const keys = Object.keys(settings);
        const values = Object.values(settings);
        const placeholders = keys.map(key => `${key} = ?`).join(', ');

        return new Promise((resolve, reject) => {
            db.run(`UPDATE guild_settings SET ${placeholders} WHERE guild_id = ?`, 
                [...values, guildId], (err) => {
                    if (err) reject(err);
                    resolve();
                });
        });
    }
};

module.exports = {
    db,
    users,
    guildSettings
}; 