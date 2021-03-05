const { Router } = require('express');

const router = Router();

const cors = require('cors');

const categoryController = require('./controllers/categoryController');

const personController = require('./controllers/personController');

const articleController = require('./controllers/articleController');

router.use(cors());

router.get('/coucou', (req, res) => {
    res.json({hello :"coucou"})
});

router.get('/profil/:id', personController.onePerson);

router.post('/person',personController.newPerson);


module.exports = router;