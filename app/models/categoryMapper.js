const Category = require('./category');

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
        // ici on écriit la requête qui va permettre d'aller chercher les données dans la bdd
      const result = await db.query(`
          SELECT * 
          FROM category
          WHERE id = $1;
      `, [id]);
      console.log(result.rows[0]);
      if (!result.rows[0]) { // si pas de données
        // le constructeur d'une Erreur attend un message en argument
        throw new Error("Pas de category avec l'id " + id);
      }
      
      
      // à partir des données brutes, je crée une instance
      return new Category(result.rows[0]);
      
    },
};

module.exports = categoryMapper;
