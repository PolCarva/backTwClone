const UsersDAO = require('../database/users');
const FollowingListsApi = require('../services/followingLists');
const FollowersListsApi = require('../services/followersLists');
const {uploadFile, readFile} = require('../utils/awsS3');

class UsersApi{
	constructor(){
		this.usersDAO = new UsersDAO();
		this.followingListsApi = new FollowingListsApi();
		this.followersListsApi = new FollowersListsApi();
	}
    
	async getAllUsers(){
		return await this.usersDAO.getAllUsers();
	}

	async getUserById(id){
		const user = await this.usersDAO.getUserById(id);
		const followingList = await this.followingListsApi.getFollowingList(id);
		const followersList = await this.followersListsApi.getFollowersList(id);
		return {user, followingList, followersList};
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