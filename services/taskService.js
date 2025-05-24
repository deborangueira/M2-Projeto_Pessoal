// services/taskService.js

const db = require('../config/db');

// Função para obter todos as atividades
const getAllTask = async () => {
  try {
    const result = await db.query('SELECT * FROM atividades');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter atividades: ' + error.message);
  }
};

// Função para obter uma atividade por ID
const getTaskById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM atividades WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter atividade: ' + error.message);
  }
};

// Função para criar um nova atividade
const createTask = async ( título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria, id_projeto) => {
  try {
    const result = await db.query(
      'INSERT INTO atividades (título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria, id_projeto) VALUES ($1, $2, $3, $4, $5, %6, $7, $8, $9) RETURNING *',
      [título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria, id_projeto]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar atividade: ' + error.message);
  }
};

// Função para atualizar uma atividade por ID
const updateTask = async (id, título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria, id_projeto
) => {
  try {
    const result = await db.query(
      'UPDATE atividades SET título = $1, descricao = $2, prazo = $3, prioridade = $4, concluido = $5, criado_em = $6, id_usuario = $7, id_categoria = $8, id_projeto = $9 WHERE id = $10 RETURNING *',
      [título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria, id_projeto, id]
    );
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
    createTask,
    updateTask,
    deleteTask

};