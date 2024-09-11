// application packages
const express = require('express')
const sessions = require('express-session')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(sessions({
    secret: 'thisismysecretkey',
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))

const articleRoutes = require('../routes/articles');
const authorRoutes = require('../routes/authors');
const userRoutes = require('../routes/user');
const adminRoutes = require('../routes/admin');
app.use('/', articleRoutes);
app.use('/', authorRoutes);
app.use('/', userRoutes);
app.use('/', adminRoutes);

// app start point 
app.listen(3025, () => {
    console.log('App is started at http://localhost:3025')
});