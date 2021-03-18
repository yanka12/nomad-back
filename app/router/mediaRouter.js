const { Router } = require('express');

const mediaRouter = Router();


const mediaController = require('../controllers/mediaController');

// Middleware de gestion des rôles
const auth = require('../middlewares/auth');

// Schema JOI
const mediaSchema = require('../schemas/media');


// Service de validation
const { validateBody } = require('../services/validator');


// Media
mediaRouter.get('/medias', mediaController.getAllMedia);
mediaRouter.get('/media/:id', mediaController.getOneMedia);
mediaRouter.post('/media', auth, validateBody(mediaSchema), mediaController.newMedia);
mediaRouter.delete('/media/:id', auth, mediaController.deleteMedia);
mediaRouter.put('/media/:id', auth, validateBody(mediaSchema), mediaController.updateMedia);


module.exports = mediaRouter;