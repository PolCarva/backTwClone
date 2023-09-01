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

	async addUserToOrRemoveUserFromFollowersList(userId, followerId){
		//LO PUSE AL REVEZ PARA QUE FUNCIONE BIEN
		return await this.followersListsDAO.addUserToOrRemoveUserFromFollowersList(followerId, userId);
	}


}

module.exports = FollowersListsApi;