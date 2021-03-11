const isAdmin = async (req, res, next) => {
    // si l'utilisateur n'a pas le rôle admin
    // on rend la vue 403
    //console.log(req.session.role_id);
    if (req.session.user.role_id !== 2) {
    
    await res.status(403).json({"error":"not authorized"});
    }

    next();
}

module.exports = isAdmin;