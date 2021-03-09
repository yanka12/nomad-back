const { Router } = require('express');

const router = Router();


const authController = require('./controllers/authController');
const categoryController = require('./controllers/categoryController');
const personController = require('./controllers/personController');
const articleController = require('./controllers/articleController');
const adminController = require('./controllers/adminController');

const isConnected = require('./middlewares/isConnected');
const isAdmin = require('./middlewares/isAdmin');

const { validateBody } = require('./services/validator');

const personSchema = require('./schemas/person');


router.get('/profil', personController.getAllPerson);
router.get('/profil/:id', personController.getOnePerson);
router.post('/profil', personController.newPerson);
router.delete('/profil/:id', personController.deleteUser);

// gestion de l'inscription
router.post('/signup', validateBody(personSchema), authController.SubmitSignupForm);

// gestion de la connexion
router.post('/login', authController.submitLoginForm);




module.exports = router;