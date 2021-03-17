require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');


// var  jwt  = require ( ' jsonwebtoken ' ) ; 

const app = express();

// body pareser config
app.use(bodyParser.urlencoded({extended: true}));
const expiryDate = new Date( Date.now() + 120 * 60 * 1000 );
app.use(session({
    name: 'session',
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    cookie: {
        secure: false,
        expires: expiryDate
    }
}));

app.use(bodyParser.json());

const cors = require('cors');

const port = process.env.PORT || 5000;

const router = require('./app/router');

app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Content-Range', '0-100/1000')
    next();
  });

app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
