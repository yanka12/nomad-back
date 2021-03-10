const articleMapper = require('../models/articleMapper');
const Article = require('../models/article');

const articleController = {
    
getAllArticle: async (request, response) => {
        const articles = await articleMapper.findAll();

        response.json(articles);
    },

getOneArticle: async (request, response) => {
        const { id } = request.params;
        console.log(id);
    
        try {
            const article = await articleMapper.findOne(id);
            response.json(article);
            
            
        } catch (err) {
            response.status(404).json(err.message);
        }
},
}

module.exports = articleController;
