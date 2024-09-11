const BaseSQLModel = require('./base')

class UserModel extends BaseSQLModel {
    constructor() {
        super('user');
    } 

    async findById(user_id){
        const user = await super.findById(user_id)
        return user
    }

    async create(user) {
        const createdUser = await super.create(user)
        return createdUser
    }

    async findOne(username) {
        const user = await super.findOne('username', username)
        return user
    } 
} 

module.exports = UserModel