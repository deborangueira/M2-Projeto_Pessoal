// controllers/subtaskController.js

const subtaskService = require('../services/subtaskService');

const  getAllSubtask = async (req, res) => {
  try {
    const subtask = await subtaskService.getAllSubtask();
    res.status(200).json(subtask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubtaskById = async (req, res) => {
  try {
    const subtask = await subtaskService.getSubtaskById(req.params.id);
    if (subtask) {
      res.status(200).json(subtask);
    } else {
      res.status(404).json({ error: 'Sub-atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// IMPLEMENTAÇÃO DO CRUD

const createSubtask = async (req, res) => {
  try {
    const {titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades} = req.body;
    const newSubtask = await subtaskService.createSubtask( titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades);
    res.status(201).json(newSubtask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubtask = async (req, res) => {
  try {
    const { titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades} = req.body;
    const updatedSubtask = await subtaskService.updateTask(req.params.id, titulo, descricao, prazo, prioridade, concluido, criado_em, id_subAtividades);
    if (updatedSubtask) {
      res.status(200).json(updatedSubtask);
    } else {
      res.status(404).json({ error: 'Sub-atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubtask = async (req, res) => {
  try {
    const deletedSubtask = await subtaskService.deleteSubtask(req.params.id);
    if (deletedSubtask) {
      res.status(200).json(deletedSubtask);
    } else {
      res.status(404).json({ error: 'Sub-atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllSubtask,
    getSubtaskById,
    createSubtask,
    updateSubtask,
    deleteSubtask
};