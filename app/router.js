const { Router } = require('express');

const router = Router();

router.get('/coucou', (req, res) => {
    res.json({hello :"coucou guigui"})
});


module.exports = router;