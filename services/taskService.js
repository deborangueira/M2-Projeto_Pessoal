// services/taskService.js

const db = require('../config/db');

const getAllTask = async () => {
  try {
    const result = await db.query('SELECT * FROM atividades');
    return result.rows;
  } catch (error) {
    if (error.code === 'ECONNRESET' || error.message.includes('Connection terminated')) {
      throw new Error('Conexão com o banco de dados perdida. Tente novamente em alguns segundos.');
    }
    throw new Error('Erro ao obter atividades: ' + error.message);
  }
};

const getTasksByUserId = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM atividades WHERE id_usuario = $1', [userId]);
    return result.rows;
  } catch (error) {
    if (error.code === 'ECONNRESET' || error.message.includes('Connection terminated')) {
      throw new Error('Conexão com o banco de dados perdida. Tente novamente em alguns segundos.');
    }
    throw new Error('Erro ao obter atividades do usuário: ' + error.message);
  }
};

const getTaskById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM atividades WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter atividade: ' + error.message);
  }
};

const createTask = async ( título, descricao, prazo, prioridade, concluido, criado_em, id_usuario) => {
  try {
    const result = await db.query(
      'INSERT INTO atividades (título, descricao, prazo, prioridade, concluido, criado_em, id_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [título, descricao, prazo, prioridade, concluido, criado_em, id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar atividade: ' + error.message);
  }
};

const updateTask = async (id, título, descricao, prazo, prioridade, concluido, criado_em, id_usuario) => {
  try {
    // Adiciona timestamp de atualização
    const agora = new Date();
    
    const result = await db.query(
      'UPDATE atividades SET título = $1, descricao = $2, prazo = $3, prioridade = $4, concluido = $5, criado_em = $6, id_usuario = $7 WHERE id = $8 RETURNING *',
      [título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id]
    );
    
    if (result.rows.length === 0) {
      throw new Error('Atividade não encontrada');
    }
    
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar atividade: ' + error.message);
  }
};

// Função para deletar uma atividade por ID
const deleteTask = async (id) => {
  try {
    const result = await db.query('DELETE FROM atividades WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar atividade: ' + error.message);
  }
};

module.exports = {
    getAllTask,
    getTaskById,
    getTasksByUserId,
    createTask,
    updateTask,
    deleteTask

};