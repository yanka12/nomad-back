const { Router } = require('express');

const mediaRouter = Router();


const mediaController = require('../controllers/mediaController');

// Middleware de gestion des rôles
const isConnected = require('../middlewares/isConnected');

// Schema JOI
const mediaSchema = require('../schemas/media');


// Service de validation
const { validateBody } = require('../services/validator');


// Media
mediaRouter.get('/medias', mediaController.getAllMedia);
mediaRouter.get('/media/:id', mediaController.getOneMedia);
mediaRouter.post('/media', isConnected, validateBody(mediaSchema), mediaController.newMedia);
mediaRouter.delete('/media/:id', isConnected, mediaController.deleteMedia);
mediaRouter.put('/media/:id', isConnected, validateBody(mediaSchema), mediaController.updateMedia);


module.exports = mediaRouter;