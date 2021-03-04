require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 4040;

const router = require('./router');

app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`Listening on port${port}`));