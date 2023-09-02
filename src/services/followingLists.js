const User_FollowingListsDAO = require('../database/users_followingLists');
const FollowingListsDAO = require('../database/followingLists');
const FollowersListsDAO = require('../database/followersLists');

class FollowingListsApi{
	constructor(){
		this.users_followingListsDAO = new User_FollowingListsDAO();
		this.followingListsDAO = new FollowingListsDAO();
		this.followersListsDAO = new FollowersListsDAO();
	}
    
	async getFollowingList(userId){
		return await this.users_followingListsDAO.getUserFollowingList(userId);
	}

	async addUserToOrRemoveUserFromFollowingList(myUserId, targetUserId){
		return await this.followingListsDAO.addUserToOrRemoveUserFromFollowingList(myUserId, targetUserId);
	}


}

module.exports = FollowingListsApi;