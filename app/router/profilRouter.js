const { Router } = require('express');

const profilRouter = Router();

const personController = require('../controllers/personController');


// Middleware de gestion des rôles
const isConnected = require('../middlewares/isConnected');
const isAdmin = require('../middlewares/isAdmin');
const isNomad = require('../middlewares/isNomad');
const isAcces = require('../middlewares/isAcces');
const auth = require('../middlewares/auth');

const { validateBody } = require('../services/validator');
const personSchema = require('../schemas/person');
const modifyPersonSchema = require('../schemas/modifyPerson');


// Profil
profilRouter.get('/profils', auth, personController.getAllPerson);
profilRouter.get('/profil/:id', isConnected, isAcces, personController.getOnePerson);
profilRouter.post('/profil', validateBody(personSchema), personController.newPerson);
profilRouter.delete('/profil/:id', isConnected, isAcces, personController.deleteUser);
profilRouter.put('/profil/:id', isConnected, isAcces, validateBody(modifyPersonSchema), personController.updatePerson);

module.exports = profilRouter;