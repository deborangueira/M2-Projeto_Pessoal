const { Pool } = require('pg'); // conecção com o banco de dados postgrees
require('dotenv').config();

const isSSL = process.env.DB_SSL === 'false';

//Criando o pool de conexões
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: isSSL ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err, client) => {
  console.error('Erro na conexão com o banco de dados:', err);
  console.log('Tentando reconectar ao banco de dados...');
});

pool.on('connect', () => {
  console.log('Nova conexão estabelecida com o banco de dados');
});

module.exports = {
  query: async (text, params) => {
    try {
      return await pool.query(text, params);
    } catch (error) {
      console.error('Erro na query:', error.message);
      throw error;
    }
  },
  connect: () => pool.connect(),
  pool: pool
};
