const articleDbModel = require('../../models/article')
const articleController = require('../article')
const articleModel = new articleDbModel()

class articleAdminController extends articleController {

    async createNewArticle(req, res) {
        if(req.method === 'GET') {
            return res.render('create');
        }

        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        }
        const articleId = await articleModel.create(newArticle)
        res.redirect(`/article/${newArticle.slug}`);
    }

    async updateArticle(req, res) {
        const articleId = req.params.id;

        if (req.method === 'GET') {
            const article = await articleModel.findById(articleId);
            return res.render('edit', { article })
        }

        const updates = req.body;
        const updatedArticle = {};
        for (const key in updates) {
            if (updates[key] !== undefined && updates[key] !== null) {
                updatedArticle[key] = updates[key];
            }
        }
        await articleModel.update(articleId, updatedArticle)
        res.redirect(`/article/${updatedArticle.slug}`)
    }

    async deleteArticle(req, res) {
        const articleId = req.params.id;
        await articleModel.delete(articleId)
        res.redirect('/');
    }
}

module.exports = articleAdminController;
