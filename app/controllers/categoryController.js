const categoryMapper = require('../models/categoryMapper');
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
            
            
        } catch (err) { // l'Error qu'on a throw dans le mapper est récupérée ici
            // et sa propriété message correspond à la string qu'on a passée en argument du constructeur
            response.status(404).json(err.message);
        }
},
}

module.exports = categoryController;
