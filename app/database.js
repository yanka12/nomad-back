const { Pool } = require('pg');

// db est un pool de connecteurs de base de données
// avec Heroku, mon Pool va devoir se connecter à DATABASE_URL
// par contre, en local, il faut qu'il continue de se connecter avec les variables d'environnement de libpq (PGUSER, PGPASSWORD etc.)
// mais en fait, Pool se débrouille tout seul comme un grand
const db = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PWD,
        database: process.env.PG_DATABASE,
        host: process.env.PG_HOST,

});

// maintenant, on n'a plus un seul connecteur mais un pool de connecteurs
module.exports = db;
