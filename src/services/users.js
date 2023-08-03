const UsersDAO = require('../database/users');

class UsersApi{
	constructor(){
		this.usersDAO = new UsersDAO();
	}
    
	async getAllUsers(){
		return await this.usersDAO.getAllUsers();
	}

	async getUserById(id){
		return await this.usersDAO.getUserById(id);
	}

	async updateUserChats(userId, chatId){
	}

	async updateUserData(){
	}
}

module.exports = UsersApi;