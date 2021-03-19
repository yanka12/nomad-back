const categoryMapper = require('../dataMappers/categoryMapper');
const Category = require('../models/category');

const categoryController = {

getAllCategories: async (request, response) => {
        const categories = await categoryMapper.findAll();

        response.json(categories);
    },

getOneCategory: async (request, response) => {
        const { id } = request.params;
        console.log(id);
    
        try {
            const category = await categoryMapper.findOne(id);
            response.json(category);
            
            
        } catch (err) {
            response.status(404).json({"error":"Category not found"});
        }
},
}

module.exports = categoryController;
