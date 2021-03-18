const { Router } = require('express');

const signUpRouter = Router();

const authController = require('../controllers/authController');

// Service de validation
const { validateBody } = require('../services/validator');

// Schema JOI
const personSchema = require('../schemas/person');


// gestion de l'inscription
signUpRouter.post('/signup', validateBody(personSchema), authController.SubmitSignupForm);





module.exports = signUpRouter;
