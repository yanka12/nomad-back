const Article = require('./article');

const db = require('../database');

const articleMapper = {
    
findAll: async () => {
        const result = await db.query(`
        SELECT * FROM article;
        `);

        return result.rows.map(art => new Article(art));
    },

findOne: async (id) => {
        console.log('id', id)
      const result = await db.query(`
          SELECT * 
          FROM article
          WHERE id = $1;
      `, [id]);
      console.log(result.rows[0]);
      if (!result.rows[0]) { 
        
        throw new Error("Pas d\'article avec l'id " + id);
      }
      
      return new Article(result.rows[0]);
      
    },
};

module.exports = articleMapper;
