const express = require('express');
const router = express.Router();
const articleAdminControllerClass = require('../controllers/admin/article');
const checkUser = require('../utils/userCheck');

const articleAdminController = new articleAdminControllerClass();

router.get('/article/create', checkUser('admin'), (req, res) => articleAdminController.createNewArticle(req, res));
router.post('/article/create', checkUser('admin'),(req, res) => articleAdminController.createNewArticle(req, res));
router.get('/article/edit/:id', checkUser('admin'), (req, res) => articleAdminController.updateArticle(req, res));
router.post('/article/edit/:id', checkUser('admin'),(req, res) => articleAdminController.updateArticle(req, res));
router.post('/article/delete/:id', checkUser('admin'),(req, res) => articleAdminController.deleteArticle(req, res));

module.exports = router