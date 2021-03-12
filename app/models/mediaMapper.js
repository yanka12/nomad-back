const Media = require('./media');

const db = require('../database');

const mediaMapper = {

findAllMedia: async () => {
        // la requête qui va chercher tous les posts dans la bdd
        const result = await db.query(`
            SELECT *
            FROM media;
        `);
        // la fonction map, ici, nous renvoit un tableau d'objet et à chaque person qu'il trouve il les retourne, sous forme d'instances de Post
        return result.rows.map(media => new Media(media));
},








};

module.exports = mediaMapper;