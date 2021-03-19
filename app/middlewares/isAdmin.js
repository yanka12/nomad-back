const isAdmin = async (req, res, next) => {
  // si l'utilisateur n'a pas le rôle admin
  // on rend la vue 403
  //console.log(req.session.role_id);
  if (req.userRoleId !== 1) {
    return res.status(403).json({ error: "not authorized" });
  }
  console.log("isAdmin", req.userRoleId);
  next();
};

module.exports = isAdmin;
