const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
    constructor() {
        super('author');
    } 

    async findById(author_id){
        const author = await super.findById(author_id)
        return author
    }

    async findAll() {
        const authors = await super.findAll()
        return authors
    } 
} 
module.exports = AuthorModel