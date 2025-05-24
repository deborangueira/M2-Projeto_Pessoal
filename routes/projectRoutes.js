const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllProject);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject); // o ":id" indica que é um parâmetro de rota e deve ser trocado por um valor
router.delete('/:id', projectController.deleteProject);

module.exports = router;
