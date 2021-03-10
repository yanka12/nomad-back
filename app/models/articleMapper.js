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

save: async (theArticle) => {

        let query;
      
        // toutes les données en commun sont préparées
        const data = [
            theArticle.name,
            theArticle.description,
            theArticle.content,
        ];
      
        
            query = "INSERT INTO article (name, description, content) VALUES ($1, $2, $3) RETURNING id;";
      
            const { rows } = await db.query(query, data);
            theArticle.id = rows[0].id;
            
        
      },

deleteArticle: async (id) => {
        console.log('id', id);
        await db.query(`
          DELETE
          FROM article
          WHERE id = $1;
          `, [id]);
      },
};

module.exports = articleMapper;
