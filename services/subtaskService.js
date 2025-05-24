// services/subtaskService.js

const db = require('../config/db');

// Função para obter todos as sub-atividades
const getAllSubtask = async () => {
  try {
    const result = await db.query('SELECT * FROM subAtividades');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter sub-atividades: ' + error.message);
  }
};

// Função para obter uma sub-atividade por ID
const getSubtaskById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM subAtividades WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter sub-atividade: ' + error.message);
  }
};

// Função para criar um nova sub-atividade
const createSubtask = async (titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades) => {
  try {
    const result = await db.query(
      'INSERT INTO subAtividades (titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar sub-atividade: ' + error.message);
  }
};

// Função para atualizar uma sub-atividade por ID
const updateSubtask = async (titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades
) => {
  try {
    const result = await db.query(
      'UPDATE subAtividades SET titulo = $1, descricao = $2, prazo = $3, prioridade = $4, concluido = $5, criado_em = $6, id_subAtividades = $7 WHERE id = $8 RETURNING *',
      [titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar sub-atividade: ' + error.message);
  }
};

// Função para deletar uma sub-atividade por ID
const deleteSubtask = async (id) => {
  try {
    const result = await db.query('DELETE FROM subAtividades WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar sub-atividade: ' + error.message);
  }
};

module.exports = {
    getAllSubtask,
    getSubtaskById,
    createSubtask,
    updateSubtask,
    deleteSubtask
};