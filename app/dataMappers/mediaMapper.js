const Media = require('../models/media');

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

const data = [
    theMedia.link
];

    query = "INSERT INTO media (link) VALUES ($1) RETURNING id;";

    const { rows } = await db.query(query, data);
    theMedia.id = rows[0].id;

},

deleteMedia: async (id) => {
    console.log('id', id);
    await db.query(`
        DELETE
        FROM media
        WHERE id = $1;
        `, [id]);
},

updateMedia: async (theMedia, id) => {

    const media = [
        theMedia.link,
        id
    ];
    //console.log(thePerson);
    let queryMedia = (`
        UPDATE media
        SET link = $1
        WHERE id = $2
        RETURNING *;
        `);  
        try {
        let result  = await db.query(queryMedia, media);

        console.log(result.rows[0]);
        return result.rows[0];

        } catch (error) {
        console.log(error);
        }
    
}






};

module.exports = mediaMapper;