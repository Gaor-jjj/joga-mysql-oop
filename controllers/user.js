const bcrypt = require('bcrypt')
const userDbModel = require('../models/user')
const userModel = new userDbModel()

class userController {

    async register(req, res) {

        const { username, email, password } = req.body;

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const existingUser = await userModel.findOne(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
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
            res.json({
                message: 'New user is registered',
                user_session: req.session.user
            })
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        const user = await userModel.findOne(username);
        if (!user) {
            return res.status(400).json({ error: 'Ivalid username or password' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password' })
        }

        req.session.user = {
            username: user.username,
            user_id: user.id
        }
        res.json({
            message: 'Login successful',
            user_session: req.session.user
        })
    }
}

module.exports = userController