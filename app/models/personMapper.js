const Person = require('./person');

const db = require('../database');

const personMapper = {
  findOne: async (id) => {
    console.log('id', id)

  const result = await db.query(`
      SELECT
          p.*,
          m.link
      FROM person AS p
      JOIN person_media AS pm
      ON p.id = pm.person_id
      JOIN media AS m
      ON m.id = pm.media_id
      WHERE p.id = $1;
  `, [id]);
  console.log(result.rows[0]);
  if (!result.rows[0]) { // si pas de données
    // le constructeur d'une Erreur attend un message en argument
    throw new Error("Pas de personne avec l'id " + id);
  }
  
  
  // à partir des données brutes, je crée une instance
  return new Person(result.rows[0]);
  
  
}, 
save: async (thePerson) => {

  let query;

  // toutes les données en commun sont préparées
  const data = [
      thePerson.nickname,
      thePerson.email,
      thePerson.password,
  ];

  
      query = "INSERT INTO person (nickname, email, password) VALUES ($1, $2, $3) RETURNING id;";
  // je ne pioche que les données parmi l'objet result qui m'est retourné

      // insérer la personne et récupérer son id
      const { rows } = await db.query(query, data);
      console.log(rows);
      // l'affecter au post
      thePerson.id = rows[0].id;
      
      // pas besoin de le retourner car il est passé par référence, donc l'objet d'origine est modifié
  
}

};

module.exports = personMapper;