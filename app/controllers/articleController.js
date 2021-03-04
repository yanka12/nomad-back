const articleMapper = require('../models/articleMapper');

const articleController = {
    allArticles: async (request, response) => {
        const articles = await articleMapper.findAll();

        response.json(articles);
    }
}

module.exports = articleController;
