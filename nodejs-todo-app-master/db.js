require('dotenv').config();
const mysql = require('mysql2/promise');

async function initDB() {
    const connection = await mysql.createConnection({ 
        host: process.env.DB_HOST, 
        user: process.env.DB_USER, 
        password: process.env.DB_PASS 
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);
    
    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id_user INT AUTO_INCREMENT PRIMARY KEY,
            login VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS todos (
            id_todo INT AUTO_INCREMENT PRIMARY KEY,
            item TEXT NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE CASCADE
        )
    `);

    return connection;
}

module.exports = initDB;
