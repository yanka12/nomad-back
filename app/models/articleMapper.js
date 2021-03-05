const Article = require('./article');

const db = require('../database');

const articleMapper = {
    findAll: async () => {
        const result = await db.query('SELECT * FROM article;');

        return result.rows.map(cat => new article(cat));
    }
};

module.exports = articleMapper;
