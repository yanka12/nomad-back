const { Router } = require('express');

const commentRouter = Router();



const commentController = require('../controllers/commentController');

// Schema JOI
const commentSchema = require('../schemas/comment');
const modifyCommentSchema = require('../schemas/modifyComment');


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
commentRouter.put('/comment/:id', isConnected, isAcces, validateBody(modifyCommentSchema), commentController.updateComment);



module.exports = commentRouter;