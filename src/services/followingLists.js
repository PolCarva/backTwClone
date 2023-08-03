const FollowingListsDAO = require('../database/followingLists');

class FollowingListsApi{
	constructor(){
		this.followingListsDAO = new FollowingListsDAO();
	}
    
	async getFollowingList(userId){
		return await this.followingListsDAO.getFollowingList(userId);
	}

	async addUserToFollowingList(myUserId, targetUserId){
		return await this.followingListsDAO.addUserToFollowingList(myUserId, targetUserId);
	}


}

module.exports = FollowingListsApi;