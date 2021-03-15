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
const isAcces = require('./middlewares/isAcces');

const { validateBody } = require('./services/validator');

const personSchema = require('./schemas/person');
const articleSchema = require('./schemas/article');
const commentSchema = require('./schemas/comment');
const mediaSchema = require('./schemas/media');

// Profil
router.get('/profils', isAdmin, isConnected, personController.getAllPerson);
router.get('/profil/:id', isConnected, isAcces, personController.getOnePerson);
router.post('/profil', validateBody(personSchema), personController.newPerson);
router.delete('/profil/:id', isConnected, isAcces, personController.deleteUser);
router.put('/profil/:id', isConnected, isAcces, validateBody(personSchema), personController.updatePerson);

// Category
router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getOneCategory);

// Article
router.get('/articles', articleController.getAllArticle);
router.get('/article/:id', articleController.getOneArticle);
router.post('/article', isAdmin, validateBody(articleSchema), articleController.newArticle);
router.delete('/article/:id', isAdmin, articleController.deleteArticle);
router.put('/article/:id', isAdmin, validateBody(articleSchema), articleController.editArticle);

// Comment
router.get('/comments', commentController.getAllComment);
router.get('/comment/:id', commentController.getOneComment);
router.post('/comment', isConnected, isNomad, validateBody(commentSchema), commentController.newComment);
router.delete('/comment/:id', isConnected, isAcces, isAdmin, commentController.deleteComment);
router.put('/comment/:id', isConnected, isAcces, validateBody(commentSchema), commentController.updateComment);

// Media
router.get('/medias', mediaController.getAllMedia);
router.get('/media/:id', mediaController.getOneMedia);
router.post('/media', isConnected, validateBody(mediaSchema), mediaController.newMedia);
router.delete('/media/:id', isConnected, mediaController.deleteMedia);
router.put('/media/:id', isConnected, validateBody(mediaSchema), mediaController.updateMedia);


// gestion de l'inscription
router.post('/signup', validateBody(personSchema), authController.SubmitSignupForm);

// gestion de la connexion
router.post('/login', validateBody(personSchema), authController.submitLoginForm);

// gestion de l'admin
router.get('/admin',  isConnected, isAdmin, adminController.getAdminInfo);

module.exports = router;