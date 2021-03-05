const Category = require('./category');

const db = require('../database');

const categoryMapper = {
    findAll: async () => {
        const result = await db.query('SELECT * FROM category;');

        return result.rows.map(cat => new Category(cat));
    }
};

module.exports = categoryMapper;
