const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');

router.get('/', subtaskController.getAllSubtask);
router.get('/:id', subtaskController.getSubtaskById);
router.post('/', subtaskController.createSubtask);
router.put('/:id', subtaskController.updateSubtask); // o ":id" indica que é um parâmetro de rota e deve ser trocado por um valor
router.delete('/:id', subtaskController.deleteSubtask);

module.exports = router;
