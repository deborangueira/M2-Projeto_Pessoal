const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.loginUser); // Rota para login
router.post('/register', userController.createUser); // Rota para cadastro
router.post('/logout', userController.logoutUser); // Rota para logout
router.get('/auth/check', userController.checkAuth); // Rota para verificar autenticação
router.put('/:id', userController.updateUser); // o ":id" indica que é um parâmetro de rota e deve ser trocado por um valor
router.delete('/:id', userController.deleteUser);

module.exports = router;
