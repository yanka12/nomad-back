const Category = require('../models/category');

const db = require('../database');

const categoryMapper = {
    
findAll: async () => {
        const result = await db.query(`
        SELECT * FROM category;
        `);

        return result.rows.map(cat => new Category(cat));
    },

findOne: async (id) => {
        console.log('id', id)
        
      const result = await db.query(`
          SELECT * 
          FROM category
          WHERE id = $1;
      `, [id]);
      console.log(result.rows[0]);
      if (!result.rows[0]) { 
  
        throw new Error("Pas de category avec l'id " + id);
      }
      
      return new Category(result.rows[0]);
      
    },
};

module.exports = categoryMapper;
