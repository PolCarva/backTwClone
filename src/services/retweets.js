const RetweetsDAO = require('../database/retweets');
const UsersFollowingListsDAO = require('../database/users_followingLists');

class RetweetsApi{
	constructor(){
		this.retweetsDAO = new RetweetsDAO();
		this.usersFollowingListsDAO = new UsersFollowingListsDAO();
	}
    
	async retweet(userId, postId){
		return await this.retweetsDAO.retweet(userId, postId);
	}

	async getHomeRetweets(userId){
		const userFollowingList = await this.usersFollowingListsDAO.getUserFollowingList(userId);
		const followingListUsersIds = userFollowingList.map(list => list.dataValues.users_ids);

		return await this.retweetsDAO.getHomeRetweets(followingListUsersIds);
	}


	async getRetweet(retweetId){
		return await this.retweetsDAO.getRetweet(retweetId);
	}

	async deleteRetweet(retweetId, userId){
		return await this.retweetsDAO.deleteRetweet(retweetId, userId);
	}
}

module.exports = RetweetsApi;