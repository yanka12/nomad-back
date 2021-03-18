const { Router } = require('express');

const adminRouter = Router();

const adminController = require('../controllers/adminController');

// Gestion des middlewares
const isAdmin = require('../middlewares/isAdmin');
const auth = require('../middlewares/auth');



// gestion de l'admin
adminRouter.get('/admin',  auth, isAdmin, adminController.getAdminInfo);
adminRouter.put('/admin/profil/:id', auth, isAdmin, adminController.updateInfo);


module.exports = adminRouter;