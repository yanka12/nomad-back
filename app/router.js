const { Router } = require('express');

const router = Router();


const authController = require('./controllers/authController');
const categoryController = require('./controllers/categoryController');
const personController = require('./controllers/personController');
const articleController = require('./controllers/articleController');
const adminController = require('./controllers/adminController');

const isConnected = require('./middlewares/isConnected');
const isAdmin = require('./middlewares/isAdmin');


router.get('/profil', personController.getAllPerson);
router.get('/profil/:id', personController.getOnePerson);
router.post('/profil', personController.newPerson);

// gestion de l'inscription

router.post('/signup', authController.SubmitSignupForm);

// gestion de la connexion

router.post('/login', authController.submitLoginForm);

module.exports = router;