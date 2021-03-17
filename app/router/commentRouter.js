const { Router } = require('express');

const commentRouter = Router();



const commentController = require('../controllers/commentController');

// Schema JOI
const commentSchema = require('../schemas/comment');


// Middleware de gestion des rôles
const isConnected = require('../middlewares/isConnected');
const isAdmin = require('../middlewares/isAdmin');
const isNomad = require('../middlewares/isNomad');
const isAcces = require('../middlewares/isAcces');

// Service de validation
const { validateBody } = require('../services/validator');



// Comment
commentRouter.get('/comments', commentController.getAllComment);
commentRouter.get('/comment/:id', commentController.getOneComment);
commentRouter.post('/comment', isConnected, isNomad, validateBody(commentSchema), commentController.newComment);
commentRouter.delete('/comment/:id', isConnected, isAcces, isAdmin, commentController.deleteComment);
commentRouter.put('/comment/:id', isConnected, isAcces, validateBody(commentSchema), commentController.updateComment);



module.exports = commentRouter;