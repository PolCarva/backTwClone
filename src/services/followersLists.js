const FollowersListsDAO = require('../database/followersLists');

class FollowersListsApi{
	constructor(){
		this.followersListsDAO = new FollowersListsDAO();
	}
    
	async getFollowersList(userId){
		return await this.followersListsDAO.getFollowersList(userId);
	}

	async addUserToFollowersList(userId, followerId){
		return await this.followersListsDAO.addUserToFollowersList(userId, followerId);
	}


}

module.exports = FollowersListsApi;