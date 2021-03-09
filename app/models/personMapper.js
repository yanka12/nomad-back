const Person = require('./person');

const db = require('../database');

// DataMapper de person, il gère les requêtes des profils utilisateurs
const personMapper = {
  // cette méthode permet de récupérer un profil particulier grace a son id c'est une fonction asynchrone qui va de paire avec 'await'
findOne: async (id) => {
    console.log('id', id)
    // ici on écriit la requête qui va permettre d'aller chercher les données dans la bdd
  const result = await db.query(`
      SELECT * 
      FROM person
      WHERE id = $1;
  `, [id]);
  console.log(result.rows[0]);
  if (!result.rows[0]) { // si pas de données
    // le constructeur d'une Erreur attend un message en argument
    throw new Error("Pas de personne avec l'id " + id);
  }
  
  
  // à partir des données brutes, je crée une instance
  return new Person(result.rows[0]);
  
},

findOneByEmail: async (email) => {
  // ici on écriit la requête qui va permettre d'aller chercher les données dans la bdd
const result = await db.query(`
    SELECT * 
    FROM person
    WHERE email = $1;
`, [email]);
console.log(result.rows[0]);
if (!result.rows[0]) { // si pas de données
  // le constructeur d'une Erreur attend un message en argument
  throw new Error("Pas de personne avec l'email " + email);
}


// à partir des données brutes, je crée une instance
return new Person(result.rows[0]);

}, 

// cette méthode permet d'insérer un nouveau profil dans la bdd
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
      // l'affecter au post
      thePerson.id = rows[0].id;
      
      // pas besoin de le retourner car il est passé par référence, donc l'objet d'origine est modifié
  
},
// cette méthode permet d'aller chercher tous les profils de la bdd
findAll: async () => {
  // la requête qui va chercher tous les posts dans la bdd
  const result = await db.query(`
      SELECT *
      FROM person;
  `);
  // la fonction map, ici, nous renvoit un tableau d'objet et à chaque person qu'il trouve il les retourne, sous forme d'instances de Post
  return result.rows.map(person => new Person(person));
},
deleteUser: async (id) => {
  console.log('id', id);
  await db.query(`
    DELETE
    FROM person
    WHERE id = $1;
    `, [id]);
},

}
module.exports = personMapper;