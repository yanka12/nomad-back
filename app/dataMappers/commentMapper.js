const Comment = require('../models/comment');

const db = require('../database');

const commentMapper = {
    
findOne: async (id) => {
            console.log('id', id)
          const result = await db.query(`
              SELECT * 
              FROM comment
              WHERE id = $1;
          `, [id]);
          console.log(result.rows[0]);
          if (!result.rows[0]) { 
            
            throw new Error("Pas de commentaire avec l'id " + id);
          }
          
          return new Comment(result.rows[0]);
          
},

findAll: async () => {
        const result = await db.query(`
        SELECT * FROM comment;
        `);

        return result.rows.map(com => new Comment(com));
},


save: async (theComment) => {

  let query;

  const data = [
      theComment.content,
      theComment.person_id,
      theComment.article_id,
  ];

  
      query = "INSERT INTO comment (content, person_id, article_id) VALUES ($1, $2, $3) RETURNING id;";

      const { rows } = await db.query(query, data);
      theComment.id = rows[0].id;
      
  
},

deleteComment: async (id) => {
        console.log('id', id);
        await db.query(`
          DELETE
          FROM comment
          WHERE id = $1;
          `, [id]);
},

updateComment: async (theComment, id) => {

  const comment = [
    theComment.content,
    theComment.person_id,
    theComment.article_id,
    id
  ];
  //console.log(thePerson);
    let queryComment = (`
        UPDATE comment
        SET content = $1,
            person_id = $2,
            article_id = $3
        WHERE id = $4
        RETURNING *;
        `);  
        try {
          let result  = await db.query(queryComment, comment);
  
          console.log(result.rows[0]);
          return result.rows[0];
  
        } catch (error) {
          console.log(error);
        }
  
}
};

module.exports = commentMapper;