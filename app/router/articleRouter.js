const { Router } = require('express');

const articleRouter = Router();

const articleController = require('../controllers/articleController');


const isAdmin = require('../middlewares/isAdmin');

const articleSchema = require('../schemas/article');
const { validateBody } = require('../services/validator');




// Article
articleRouter.get('/articles', articleController.getAllArticle);
articleRouter.get('/article/:id', articleController.getOneArticle);
articleRouter.post('/article', isAdmin, validateBody(articleSchema), articleController.newArticle);
articleRouter.delete('/article/:id', isAdmin, articleController.deleteArticle);
articleRouter.put('/article/:id', isAdmin, validateBody(articleSchema), articleController.editArticle);


module.exports = articleRouter;