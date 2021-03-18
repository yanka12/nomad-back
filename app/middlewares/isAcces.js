const isAcces = (req, res, next) => {
    //console.log(req.session.user);
    if(req.userRoleId == 1){
        next();
    }
    else if (req.userId != req.params.id) {
    // s'il n'est pas loggé on le redirige vers la page de login
    res.status(401).json({"error":"not allowed to connect"});
    }
    // si le user est connecté on laisse la suite du code s'exécute
    else {// => on passe au prochain middleware
    next();
    }
}


module.exports = isAcces;

