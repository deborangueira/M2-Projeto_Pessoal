const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.loginUser); // Rota para login
router.post('/register', userController.createUser); // Rota para cadastro
router.post('/logout', userController.logoutUser); // Rota para logout
router.get('/auth/check', userController.checkAuth); // Rota para verificar autenticação
router.put('/:id', requireAuth, userController.updateUser); // Aplicar middleware de autenticação
router.delete('/:id', userController.deleteUser);

module.exports = router;
