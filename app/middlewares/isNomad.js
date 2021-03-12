const isNomad = async (req, res, next) => {
    // si l'utilisateur n'a pas le rôle admin
    // on rend la vue 403
    //console.log(req.session.role_id);
    if (req.session.user.role_id == 2 || req.session.user.role_id == 1 ) {
        next();
    }
    else{
    await res.status(403).json({"error":"not authorized"});
    }
    
};

module.exports = isNomad;