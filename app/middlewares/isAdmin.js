const isAdmin = (req, res, next) => {
  // si l'utilisateur n'a pas le rôle admin
  // on rend la vue 403
  if (req.session.user.role !== 'admin') {
    res.status(403).render('403');
  }

  next();
}

module.exports = isAdmin;