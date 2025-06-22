// services/userService.js

const db = require('../config/db');

const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};

const getUserById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

const createUser = async (nome, email, senha) => {
  try {
    const result = await db.query(
      'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

const updateUser = async (id, nome, email, senha) => {
  try {
    let query;
    let params;
    
    if (senha) {
      // Atualizar com nova senha
      query = 'UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *';
      params = [nome, email, senha, id];
    } else {
      // Atualizar sem alterar a senha
      query = 'UPDATE usuario SET nome = $1, email = $2 WHERE id = $3 RETURNING *';
      params = [nome, email, id];
    }
    
    const result = await db.query(query, params);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const result = await db.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

const authenticateUser = async (email, senha) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1 AND senha = $2', [email, senha]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao autenticar usuário: ' + error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar usuário por email: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser,
  getUserByEmail
};
