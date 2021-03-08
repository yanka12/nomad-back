const isConnected = (req, res, next) => {
  if (!req.session.user) {
    // s'il n'est pas loggé on le redirige vers la page de login
    res.redirect('/login');
  }

  // si le user est connecté on laisse la suite du code s'exécute
  // => on passe au prochain middleware
  next();
}



module.exports = isConnected;
