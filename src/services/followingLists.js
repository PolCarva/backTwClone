const User_FollowingListsDAO = require('../database/users_followingLists');

class FollowingListsApi{
	constructor(){
		this.users_followingListsDAO = new User_FollowingListsDAO();
	}
    
	async getFollowingList(userId){
		return await this.users_followingListsDAO.getUserFollowingList(userId);
	}

	async addUserToFollowingList(myUserId, targetUserId){
		return await this.followingListsDAO.addUserToFollowingList(myUserId, targetUserId);
	}


}

module.exports = FollowingListsApi;