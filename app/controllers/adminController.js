const adminController = {
getAdminInfo: async (req, res) => {

    console.log(req.session.user);
    if (!req.session.user || req.session.user.role_id !== 1) {
    return await res.status(403).json({"error":"you are not an admin"});
    }
    else {
    //     // ici le user a bien les droits
    return await res.status(200);
    }
}

};

module.exports = adminController;