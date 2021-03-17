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

const articleRouter = require('./app/router/articleRouter');
const categoryRouter = require('./app/router/categoryRouter');
const commentRouter = require('./app/router/commentRouter');
const profilRouter = require('./app/router/profilRouter');
const mediaRouter = require('./app/router/mediaRouter');
const loginRouter = require('./app/router/loginRouter');
const signUpRouter = require('./app/router/signUpRouter');
const adminRouter = require('./app/router/adminRouter');

app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Content-Range', '0-100/1000')
    next();
  });

app.use(express.json());

app.use(
  articleRouter,
  categoryRouter,
  commentRouter,
  profilRouter,
  mediaRouter,
  signUpRouter,
  loginRouter,
  adminRouter,
  );

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
