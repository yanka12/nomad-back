const categoryMapper = require('../models/categoryMapper');

const categoryController = {
    getAllCategories: async (request, response) => {
        const categories = await categoryMapper.findAll();

        response.json(categories);
    }
}

module.exports = categoryController;
