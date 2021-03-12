const Media = require('./media');

const db = require('../database');
const { id } = require('../schemas/person');

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

findOneMedia: async (id) => {
    // console.log('id', id)
    const result = await db.query(`
    SELECT * 
    FROM media
    WHERE id = $1;
    `, [id]);
    // console.log(result.rows[0]);
if (!result.rows[0]) { 
    
    throw new Error("Pas de média avec l'id " + id);
}

return new Media(result.rows[0]);

},

save: async (theMedia) => {

let query;

// toutes les données en commun sont préparées
const data = [
    theMedia.link
];


    query = "INSERT INTO media (link) VALUES ($1) RETURNING id;";

    const { rows } = await db.query(query, data);
    theMedia.id = rows[0].id;

},








};

module.exports = mediaMapper;