const express = require('express');
const router = express.Router();
const userControllerClass = require('../controllers/user');

const userController = new userControllerClass();

router.get('/user/login', (req, res) => userController.showLoginPage(req, res));
router.get('/user/logout', (req, res) => userController.logout(req, res));
router.get('/user/register', (req, res) => userController.showRegisterPage(req, res));
router.post('/user/register', (req, res) => userController.register(req, res));
router.post('/user/login', (req, res) => userController.login(req, res));

module.exports = router;