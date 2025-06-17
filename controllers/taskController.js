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
    const {título, descricao, prazo, prioridade, concluido, criado_em, id_usuario} = req.body;
    const newTask = await taskService.createTask( título, descricao, prazo, prioridade, concluido, criado_em, id_usuario);
    res.redirect("/listaAtividades");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { título, descricao, prazo, prioridade, concluido } = req.body;
    
    // Validações básicas
    if (!título || título.trim().length < 3) {
      return res.status(400).json({ error: 'Título é obrigatório e deve ter pelo menos 3 caracteres' });
    }
    
    if (descricao && descricao.length > 500) {
      return res.status(400).json({ error: 'Descrição não pode exceder 500 caracteres' });
    }
    
    if (prazo) {
      const selectedDate = new Date(prazo);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        return res.status(400).json({ error: 'Data de vencimento não pode ser anterior a hoje' });
      }
    }
    
    // Buscar a tarefa existente para preservar dados não editáveis
    const existingTask = await taskService.getTaskById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    
    const updatedTask = await taskService.updateTask(
      req.params.id,
      título.trim(),
      descricao ? descricao.trim() : '',
      prazo || null,
      prioridade,
      concluido,
      existingTask.criado_em, // Preserva a data de criação original
      existingTask.id_usuario // Preserva o usuário original
    );
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
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