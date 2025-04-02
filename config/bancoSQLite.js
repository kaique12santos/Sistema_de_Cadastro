require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Criar conexão com o banco de dados
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    createTables();
  }
});