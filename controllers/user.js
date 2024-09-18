const bcrypt = require('bcrypt')
const userDbModel = require('../models/user')
const userModel = new userDbModel()

class userController {

    async showLoginPage(req, res) {
        res.render('login')
    }

    async showRegisterPage(req, res) {
        res.render('register');
    }

    async register(req, res) {

        const { username, email, password } = req.body;

        if (password.length < 6) {
            return res.status(400).render('register', {error: 'Password must be at least 6 characters long'});
        }

        const existingUser = await userModel.findOne(username);
        if (existingUser) {
            return res.status(400).render('register', {error: 'Username already exists'});
        }

        const cryptPassword = await bcrypt.hash(req.body.password, 10)
        const registeredId = await userModel.create({
            username,
            email,
            password: cryptPassword
        })

        if(registeredId) {
            const userData = await userModel.findById(registeredId)
            req.session.user = {
                username: userData.username,
                user_id: userData.id
            }
            res.redirect('/')
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        const user = await userModel.findOne(username);
        if (!user) {
            return res.status(401).render('login', {error: 'Invalid username or password'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).render('login', {error: 'Invalid username or password'})
        }

        req.session.user = {
            username: user.username,
            user_id: user.id
        }
        res.redirect('/');
    }

    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        })
    }
}

module.exports = userController