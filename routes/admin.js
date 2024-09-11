const express = require('express');
const router = express.Router();
const articleAdminControllerClass = require('../controllers/admin/article');
const checkUser = require('../utils/userCheck');

const articleAdminController = new articleAdminControllerClass();

router.post('/article/create', checkUser('admin'),(req, res) => articleAdminController.createNewArticle(req, res));
router.patch('/article/edit/:id', checkUser('admin'),(req, res) => articleAdminController.updateArticle(req, res));
router.delete('/article/delete/:id', checkUser('admin'),(req, res) => articleAdminController.deleteArticle(req, res));

module.exports = router