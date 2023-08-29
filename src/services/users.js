const UsersDAO = require('../database/users');
const {uploadFile, readFile} = require('../utils/awsS3');

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

	async getUsersById(id){
		return await this.usersDAO.getUsersById(id);
	}

	async updateUserChats(userId, chatId){
	}

	async updateUserData(profilePhotoFile, userId, username, fullName, profilePhotoS3){
		await uploadFile(profilePhotoFile, `user${userId}`);
		return await this.usersDAO.updateUserData(userId, username, fullName, profilePhotoS3);
	}

	async updateUserStatus(userId, online){
		return await this.usersDAO.updateUserStatus(userId, online);
	}

	async deleteUser(userId){
		return await this.usersDAO.deleteUser(userId);
	}
}

module.exports = UsersApi;