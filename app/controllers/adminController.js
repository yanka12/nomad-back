const adminController = {
adminPage: (req, res) => {
    res.render('admin');
    // on veut rendre uniquement si:
    // - le user est connecté
    // - le user a le rôle "admin"

    if (!req.session.user) {
    //   // s'il n'est pas loggé on le redirige vers la page de login
    res.redirect('/login');
    }
    else {
    //   // s'il est connecté, on veut vérifier qu'il a les droits
    //   // => avoir le rôle admin
    if (req.session.user.role !== 'admin') {
        res.status(403).render('403');
    }
    else {
    //     // ici le user a bien les droits
    res.render('admin');
    }
    }
}
};

module.exports = adminController;