const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory); // o ":id" indica que é um parâmetro de rota e deve ser trocado por um valor
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
