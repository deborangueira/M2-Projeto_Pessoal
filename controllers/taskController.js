// controllers/taskController.js

const taskService = require('../services/taskService');

const  getAllTask = async (req, res) => {
  try {
    const task = await taskService.getAllTask();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// IMPLEMENTAÇÃO DO CRUD

const createTask = async (req, res) => {
  try {
    const {título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria} = req.body;
    const newTask = await taskService.createTask( título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const {título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria} = req.body;
    const updatedTask = await taskService.updateTask(req.params.id, título, descricao, prazo, prioridade, concluido, criado_em, id_usuario, id_categoria);
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskService.deleteTask(req.params.id);
    if (deletedTask) {
      res.status(200).json(deletedTask);
    } else {
      res.status(404).json({ error: 'Atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask

};