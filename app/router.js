const { Router } = require('express');

const router = Router();

const categoryController = require('./controllers/categoryController');

const personController = require('./controllers/personController');

const articleController = require('./controllers/articleController');


router.get('/profil', personController.getAllPerson);

router.get('/profil/:id', personController.getOnePerson);

router.post('/profil', personController.newPerson);


module.exports = router;