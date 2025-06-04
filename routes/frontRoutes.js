const express = require('express');
const router = express.Router();
const path = require('path');

// Roteamento para páginas dinâmicas

// Rota raiz que redireciona para a página de login

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../views/layout/main'), {
        pageTitle: 'Login no SmartTasks',
        content: path.join(__dirname, '../views/pages/login')
    });
});

router.get('/cadastro', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Cadastre-se',
    content: path.join(__dirname, '../views/pages/cadastro')
  });
});

router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Login no SmartTasks',
    content: path.join(__dirname, '../views/pages/login')
  });
});

// Adicione outras rotas conforme necessário

module.exports = router;
