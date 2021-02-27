if (process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const app = express();
const index = require('./routes/index.js');

app.use(express.urlencoded({ extended:true }));
app.use(express.json())
app.use(cors());

app.use('/', index);

module.exports = app;