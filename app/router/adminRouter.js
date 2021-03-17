const { Router } = require('express');

const adminRouter = Router();

const adminController = require('../controllers/adminController');


const isConnected = require('../middlewares/isConnected');
const isAdmin = require('../middlewares/isAdmin');










// gestion de l'admin
adminRouter.get('/admin',  isConnected, isAdmin, adminController.getAdminInfo);
adminRouter.put('/admin/profil/:id', isConnected, isAdmin, adminController.updateInfo);


module.exports = adminRouter;