const { Router } = require('express');

const loginRouter = Router();


const authController = require('../controllers/authController');


// Service de validation
const { validateBody } = require('../services/validator');

// Schema JOI
const personLoginSchema = require('../schemas/personLogin');


// gestion de la connexion
loginRouter.post('/login', validateBody(personLoginSchema), authController.submitLoginForm);



module.exports = loginRouter;