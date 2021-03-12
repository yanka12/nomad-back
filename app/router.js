const { Router } = require('express');

const router = Router();


const authController = require('./controllers/authController');
const categoryController = require('./controllers/categoryController');
const personController = require('./controllers/personController');
const articleController = require('./controllers/articleController');
const adminController = require('./controllers/adminController');
const commentController = require('./controllers/commentController');
const mediaController = require('./controllers/mediaController');


// Middleware de gestion des rôles
const isConnected = require('./middlewares/isConnected');
const isAdmin = require('./middlewares/isAdmin');
const isNomad = require('./middlewares/isNomad');

const { validateBody } = require('./services/validator');

const personSchema = require('./schemas/person');

// Profil
router.get('/profils', personController.getAllPerson);
router.get('/profil/:id', personController.getOnePerson);
router.post('/profil', personController.newPerson);
router.delete('/profil/:id', personController.deleteUser);
router.put('/profil/:id', isConnected, personController.updatePerson);

// Category
router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getOneCategory);

// Article
router.get('/articles', articleController.getAllArticle);
router.get('/article/:id', articleController.getOneArticle);
router.post('/article', articleController.newArticle);
router.delete('/article/:id', articleController.deleteArticle);
router.put('/article/:id', articleController.editArticle);

// Comment
router.get('/comments', commentController.getAllComment);
router.get('/comment/:id', commentController.getOneComment);
router.post('/comment', commentController.newComment);
router.delete('/comment/:id', commentController.deleteComment);
router.put('/comment/:id', commentController.updateComment);

// Media
router.get('/medias', mediaController.getAllMedia);
router.get('/media/:id', mediaController.getOneMedia);


// gestion de l'inscription
router.post('/signup', validateBody(personSchema), authController.SubmitSignupForm);

// gestion de la connexion
router.post('/login', authController.submitLoginForm);

// gestion de l'admin
router.get('/admin',  isConnected, isAdmin, adminController.getAdminInfo);

module.exports = router;