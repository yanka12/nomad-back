const { Router } = require('express');

const router = Router();

router.get('/coucou', (req, res) => {
    res.json({hello :"coucou"})

    // ici, une 404 pour l'API
router.use((request, response) => {
    response.status(404).json('No such endpoint');
});


module.exports = router;