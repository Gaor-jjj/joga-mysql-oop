// Application packages
const express = require('express')
const sessions = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('express-handlebars')

const app = express()

// New instance of express-handlebars
const hbsInstance = hbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    helpers: {
        isAdmin: (user, options) => {
            if (user && user.username === 'admin') {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbsInstance.engine);

app.use(express.static('public'));

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sessions({
    secret: 'thisismysecretkey',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
}));

// Routes
const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/authors');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
app.use('/', articleRoutes);
app.use('/', authorRoutes);
app.use('/', userRoutes);
app.use('/', adminRoutes);

// App start point 
app.listen(3025, () => {
    console.log('App is started at http://localhost:3025')
});