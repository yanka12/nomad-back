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

newArticle: async (request, response) => {
    // on crée directement notre model à partir des données envoyées dans le payload
    const theArticle = new Article(request.body);
    
    console.log(request.body);

    try {
        // pas de retour, postMapper intervient directement sur son paramètre, l'objet étant passé par référence
        await articleMapper.save(theArticle);
        // console.log(thePerson);
        response.json(theArticle);
    } catch (err) {
        response.status(403).json(err.message);
    }
},
}

module.exports = articleController;
