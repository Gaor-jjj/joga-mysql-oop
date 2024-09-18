const articleDbModel = require('../models/article')
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        const articles = [] 
    } 

    async getAllArticles(req, res) {
        const articles = await articleModel.findAll()
        res.status(200).render('index', {
            articles,
            user: req.session.user
        })
    } 

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.render('article', {
            article: article,
            user: req.session.user
        });
    }
} 

module.exports = articleController