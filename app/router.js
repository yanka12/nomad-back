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

// Profil
router.get('/profils', personController.getAllPerson);
router.get('/profil/:id', personController.getOnePerson);
router.post('/profil', personController.newPerson);
router.delete('/profil/:id', personController.deleteUser);
router.put('/profil/:id', personController.updatePerson);

// Category
router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getOneCategory);

// Article
router.get('/articles', articleController.getAllArticle);
router.get('/article/:id', articleController.getOneArticle);
router.post('/article', articleController.newArticle);
router.delete('/article/:id', articleController.deleteArticle)

// gestion de l'inscription
router.post('/signup', validateBody(personSchema), authController.SubmitSignupForm);

// gestion de la connexion
router.post('/login', authController.submitLoginForm);

// gestion de l'admin
router.get('/admin',  isConnected, isAdmin, adminController.getAdminInfo);




module.exports = router;