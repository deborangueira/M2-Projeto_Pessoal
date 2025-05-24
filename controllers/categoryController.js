// controllers/userController.js

const categoryService = require('../services/categoryService');

const  getAllCategory = async (req, res) => {
  try {
    const users = await categoryService.getAllCategory();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const user = await categoryService.getCategoryById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// IMPLEMENTAÇÃO DO CRUD

const createCategory = async (req, res) => {
  try {
    const { titulo_categoria, descrissao } = req.body;
    const newCategory = await categoryService.createCategory( titulo_categoria, descrissao);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const {titulo_categoria, descrissao} = req.body;
    const updateCategory = await categoryService.updateCategory(req.params.id, titulo_categoria, descrissao);
    if (updateCategory) {
      res.status(200).json(updateCategory);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await categoryService.deleteCategory(req.params.id);
    if (deleteCategory) {
      res.status(200).json(deleteCategory);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
