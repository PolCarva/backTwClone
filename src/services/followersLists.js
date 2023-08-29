const FollowersListsDAO = require('../database/followersLists');
const UserFollowersListsDAO = require('../database/users_followersLists');

class FollowersListsApi{
	constructor(){
		this.followersListsDAO = new FollowersListsDAO();
		this.userFollowersListsDAO = new UserFollowersListsDAO();
	}
    
	async getFollowersList(userId){
		return await this.userFollowersListsDAO.getUserFollowersList(userId);
	}

	async addUserToFollowersList(userId, followerId){
		return await this.followersListsDAO.addUserToFollowersList(userId, followerId);
	}


}

module.exports = FollowersListsApi;