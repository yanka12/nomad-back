
const isConnected = (req, res, next) => {
  //console.log(req.session.user);
  if (!req.session.user) {
    // s'il n'est pas loggé on le redirige vers la page de login
    res.json({"error":"not allowed to connect"});
  }

  // si le user est connecté on laisse la suite du code s'exécute
  // => on passe au prochain middleware
  next();
}



module.exports = isConnected;
