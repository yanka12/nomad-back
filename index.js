require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');


// var  jwt  = require ( ' jsonwebtoken ' ) ; 

const app = express();

// body pareser config
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    // phrase pour crypter les infos
    secret: 'mon super secret',
    // sauvegarde la session à chaque requête même si elle n'est pas modifiée
    saveUninitialized: true,
    // resauvegarde la session à chaque requête même s'il n'y a pas de changement
    resave: true,
}));
app.use(bodyParser.json());

const cors = require('cors');

const port = process.env.PORT || 5000;

const router = require('./app/router');

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
