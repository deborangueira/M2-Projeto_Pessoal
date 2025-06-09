const express = require('express');
const router = express.Router();
const path = require('path');

// Roteamento para páginas dinâmicas

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

router.get('/listaAtividades', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'minhas atividades',
    content: path.join(__dirname, '../views/pages/listaAtividades')
  });
});

router.get('/novaAtividade', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'adicionar atividades',
    content: path.join(__dirname, '../views/pages/novaAtividade')
  });
});

router.get('/perfil', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Meu perfil',
    content: path.join(__dirname, '../views/pages/perfil')
  });
});

module.exports = router;
