// services/categoryService.js

const db = require('../config/db');

// Função para obter todos as categorias
const getAllCategory = async () => {
  try {
    const result = await db.query('SELECT * FROM categoria');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter categorias: ' + error.message);
  }
};

// Função para obter uma categoria por ID
const getCategoryById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM categoria WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter categoria: ' + error.message);
  }
};

// Função para criar um nova categoria
const createCategory = async (titulo_categoria, descricao) => {
  try {
    const result = await db.query(
      'INSERT INTO categoria (titulo_categoria, descricao) VALUES ($1, $2) RETURNING *',
      [titulo_categoria, descricao]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar categoria: ' + error.message);
  }
};

// Função para atualizar uma categoria por ID
const updateCategory = async (id, titulo_categoria, descricao) => {
  try {
    const result = await db.query(
      'UPDATE categoria SET titulo_categoria = $1, descricao = $2 WHERE id = $3 RETURNING *',
      [titulo_categoria, descricao, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar categorias: ' + error.message);
  }
};

// Função para deletar uma categoria por ID
const deleteCategory = async (id) => {
  try {
    const result = await db.query('DELETE FROM categoria WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar categoria: ' + error.message);
  }
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};