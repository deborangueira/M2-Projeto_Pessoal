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

const getTasksByUser = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const tasks = await taskService.getTasksByUserId(req.session.userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    
    if (task.id_usuario !== req.session.userId) {
      return res.status(403).json({ error: 'Acesso negado: você só pode visualizar suas próprias atividades' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// IMPLEMENTAÇÃO DO CRUD

const createTask = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const {título, descricao, prazo, prioridade, concluido, criado_em} = req.body;
    const newTask = await taskService.createTask( título, descricao, prazo, prioridade, concluido, criado_em, req.session.userId);
    res.redirect("/listaAtividades");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
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
    
    // Buscar a tarefa existente para verificar autorização
    const existingTask = await taskService.getTaskById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    
    if (existingTask.id_usuario !== req.session.userId) {
      return res.status(403).json({ error: 'Acesso negado: você só pode editar suas próprias atividades' });
    }
    
    const updatedTask = await taskService.updateTask(
      req.params.id,
      título.trim(),
      descricao ? descricao.trim() : '',
      prazo || null,
      prioridade,
      concluido,
      existingTask.criado_em,
      existingTask.id_usuario
    );
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const existingTask = await taskService.getTaskById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    
    if (existingTask.id_usuario !== req.session.userId) {
      return res.status(403).json({ error: 'Acesso negado: você só pode excluir suas próprias atividades' });
    }
    
    const deletedTask = await taskService.deleteTask(req.params.id);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllTask,
    getTaskById,
    getTasksByUser,
    createTask,
    updateTask,
    deleteTask

};