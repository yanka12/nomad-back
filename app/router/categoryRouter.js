const { Router } = require('express');

const categoryRouter = Router();

const categoryController = require('../controllers/categoryController');










// Category
categoryRouter.get('/categories', categoryController.getAllCategories);
categoryRouter.get('/category/:id', categoryController.getOneCategory);


module.exports = categoryRouter;