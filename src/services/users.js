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

	async deleteUser(userId){
		return await this.usersDAO.deleteUser(userId);
	}
}

module.exports = UsersApi;