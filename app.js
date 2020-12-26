require('dotenv').config();
const express = require('express');
const app = express();

global.Promise = require('bluebird');
require('./router')(app);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));