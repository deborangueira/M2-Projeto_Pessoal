const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware para verificar autenticação
const requireAuth = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

// Middleware para redirecionar usuários logados
const redirectIfLoggedIn = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) {
    return res.redirect('/listaAtividades');
  } else {
    return next();
  }
};

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

router.get('/listaAtividades', requireAuth, (req, res) => {
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

router.get('/novaAtividade', requireAuth, (req, res) => {
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

router.get('/perfil', requireAuth, (req, res) => {
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
