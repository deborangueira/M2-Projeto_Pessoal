// controllers/projectController.js

const projectService = require('../services/projectService');

const  getAllProject = async (req, res) => {
  try {
    const projects = await projectService.getAllProject();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Projeto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// IMPLEMENTAÇÃO DO CRUD

const createProject = async (req, res) => {
  try {
    const { titulo_projeto, descrissao } = req.body;
    const newProject = await projectService.createProject(titulo_projeto, descrissao);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const {titulo_projeto, descrissao} = req.body;
    const updatedProject = await projectService.updateProject(req.params.id, titulo_projeto, descrissao);
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ error: 'Projeto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectService.deleteProject(req.params.id);
    if (deletedProject) {
      res.status(200).json(deletedProject);
    } else {
      res.status(404).json({ error: 'Projeto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject

};