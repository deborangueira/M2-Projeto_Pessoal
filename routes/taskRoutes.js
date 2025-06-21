const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, taskController.getAllTask);
router.get('/user', requireAuth, taskController.getTasksByUser);
router.get('/:id', requireAuth, taskController.getTaskById);
router.post('/', requireAuth, taskController.createTask);
router.put('/:id', requireAuth, taskController.updateTask);
router.delete('/:id', requireAuth, taskController.deleteTask);

module.exports = router;
