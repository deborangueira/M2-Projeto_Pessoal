const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser); // o ":id" indica que é um parâmetro de rota e deve ser trocado por um valor
router.delete('/:id', userController.deleteUser);

module.exports = router;
