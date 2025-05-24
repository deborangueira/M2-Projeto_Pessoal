// services/projectService.js

const db = require('../config/db');

// Função para obter todos os projetos
const getAllProject = async () => {
  try {
    const result = await db.query('SELECT * FROM projetos');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter projetos: ' + error.message);
  }
};

// Função para obter uma projetos por ID
const getProjectById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM projetos WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter projeto: ' + error.message);
  }
};

// Função para criar um nova categoria
const createProject = async (titulo_projeto, descrissao) => {
  try {
    const result = await db.query(
      'INSERT INTO projetos (titulo_projeto, descrissao) VALUES ($1, $2) RETURNING *',
      [titulo_projeto, descrissao]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar projeto: ' + error.message);
  }
};

// Função para atualizar uma projetos por ID
const updateProject = async (id, titulo_projeto, descrissao) => {
  try {
    const result = await db.query(
      'UPDATE projetos SET titulo_projeto = $1, descrissao = $2 WHERE id = $3 RETURNING *',
      [titulo_projeto, descrissao, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar projeto: ' + error.message);
  }
};

// Função para deletar uma projetos por ID
const deleteProject = async (id) => {
  try {
    const result = await db.query('DELETE FROM projetos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar projeto: ' + error.message);
  }
};

module.exports = {
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};