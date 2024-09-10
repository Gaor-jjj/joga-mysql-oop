// application packages
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const articleRoutes = require('../routes/articles');
const authorRoutes = require('../routes/authors');
app.use('/', articleRoutes);
app.use('/', authorRoutes);

// app start point 
app.listen(3025, () => {
    console.log('App is started at http://localhost:3025')
});