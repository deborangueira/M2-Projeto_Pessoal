// controllers/userController.js

const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// IMPLEMENTAÇÃO DO CRUD

const createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    const newUser = await userService.createUser(nome, email, senha);
    setTimeout(() => {
      res.redirect("/login");
    }, 700);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const updatedUser = await userService.updateUser(
      req.params.id,
      nome,
      email,
      senha
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função de login
const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        error: 'Email e senha são obrigatórios'
      });
    }

    const user = await userService.authenticateUser(email, senha);
    
    if (user) {
      // Criar sessão do usuário
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.userName = user.nome;
      req.session.isLoggedIn = true;
      
      res.status(200).json({
        sucesso: true,
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email
        }
      });
    } else {
      res.status(401).json({
        sucesso: false,
        error: 'Email ou senha incorretos'
      });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      sucesso: false,
      error: 'Erro interno do servidor'
    });
  }
};

// Função de logout
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        sucesso: false,
        error: 'Erro ao fazer logout'
      });
    }
    res.status(200).json({
      sucesso: true,
      message: 'Logout realizado com sucesso'
    });
  });
};

// Função para verificar se o usuário está logado
const checkAuth = (req, res) => {
  if (req.session && req.session.isLoggedIn) {
    res.status(200).json({
      isLoggedIn: true,
      user: {
        id: req.session.userId,
        nome: req.session.userName,
        email: req.session.userEmail
      }
    });
  } else {
    res.status(200).json({
      isLoggedIn: false
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  checkAuth
};
