const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTask);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask); // o ":id" indica que é um parâmetro de rota e deve ser trocado por um valor
router.delete('/:id', taskController.deleteTask);

module.exports = router;
