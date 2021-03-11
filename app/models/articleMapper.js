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
      SELECT
        a.*,
        m.link,
        c.id AS category_id
    FROM article AS a
    LEFT JOIN article_media AS am
    ON a.id = am.article_id
    LEFT JOIN media AS m
    ON m.id = am.media_id
    LEFT JOIN category_article AS ca
    ON a.id = ca.article_id
    LEFT JOIN category AS c
    ON c.id = ca.category_id
    WHERE a.id = $1;
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

updateArticle: async (theArticle, id) => {

  const article = [
    theArticle.name,
    theArticle.description,
    theArticle.content,
    id
  ];
  //console.log(thePerson);
    let queryArticle = (`
        UPDATE article
        SET name = $1,
            description = $2,
            content = $3
        WHERE id = $4
        RETURNING *;
        `);  
        try {
          let result  = await db.query(queryArticle, article);
  
          console.log(result.rows[0]);
          return result.rows[0];
  
        } catch (error) {
          console.log(error);
        }
  
  }
};

module.exports = articleMapper;
