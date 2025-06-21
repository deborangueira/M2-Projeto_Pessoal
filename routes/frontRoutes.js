const express = require('express');
const router = express.Router();
const path = require('path');
const { requireAuthRedirect, redirectIfLoggedIn } = require('../middleware/auth');

// Roteamento para páginas dinâmicas

router.get('/', redirectIfLoggedIn, (req, res) => {
    res.render(path.join(__dirname, '../views/layout/main'), {
        pageTitle: 'Login no SmartTasks',
        content: path.join(__dirname, '../views/pages/login'),
        user: null
    });
});

router.get('/cadastro', redirectIfLoggedIn, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Cadastre-se',
    content: path.join(__dirname, '../views/pages/cadastro'),
    user: null
  });
});

router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Login no SmartTasks',
    content: path.join(__dirname, '../views/pages/login'),
    user: null
  });
});

router.get('/listaAtividades', requireAuthRedirect, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Minhas atividades',
    content: path.join(__dirname, '../views/pages/listaAtividades'),
    user: {
      id: req.session.userId,
      nome: req.session.userName,
      email: req.session.userEmail
    }
  });
});

router.get('/novaAtividade', requireAuthRedirect, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Adicionar atividades',
    content: path.join(__dirname, '../views/pages/novaAtividade'),
    user: {
      id: req.session.userId,
      nome: req.session.userName,
      email: req.session.userEmail
    }
  });
});

router.get('/perfil', requireAuthRedirect, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Meu perfil',
    content: path.join(__dirname, '../views/pages/Perfil'),
    user: {
      id: req.session.userId,
      nome: req.session.userName,
      email: req.session.userEmail
    }
  });
});

module.exports = router;
