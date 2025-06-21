const requireAuth = (req, res, next) => {
  if (req.session && req.session.isLoggedIn && req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }
};

const requireAuthRedirect = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

const redirectIfLoggedIn = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) {
    return res.redirect('/listaAtividades');
  } else {
    return next();
  }
};

module.exports = {
  requireAuth,
  requireAuthRedirect,
  redirectIfLoggedIn
};