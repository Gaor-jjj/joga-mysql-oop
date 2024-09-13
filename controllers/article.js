const articleDbModel = require('../models/article')
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        const articles = [] 
    } 

    async getAllArticles(req, res) {
        const articles = await articleModel.findAll()
        res.status(200).render('index', {articles: articles})
    } 

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug)
        res.status(200).json({article: article})
    }
} 

module.exports = articleController