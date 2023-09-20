const RetweetsDAO = require('../database/retweets');
const UsersFollowingListsDAO = require('../database/users_followingLists');
const NotificationsApi = require('./notifications');
const PostsApi = require('./posts');
const { postRetweetedTitle, postRetweetedMessage } = require('../utils/notificationsMessages');

class RetweetsApi{
	constructor(){
		this.retweetsDAO = new RetweetsDAO();
		this.usersFollowingListsDAO = new UsersFollowingListsDAO();
		this.postsApi = new PostsApi();
		this.notificationsApi = new NotificationsApi();
		this.retweetId;
	}
    
	async retweet(userId, postId, userUsername){
		const post = await this.postsApi.getPost(postId);
		const retweet = await this.retweetsDAO.retweet(userId, postId);

		if(retweet.dataValues === undefined){
			console.log(this.retweetId);
			await this.notificationsApi.deleteNotification('retweets', this.retweetId);
		}else{
			this.retweetId = retweet.dataValues.id;
			await this.notificationsApi.createNotification(postRetweetedTitle(), postRetweetedMessage(userUsername), post.user_id, 'retweets', retweet.dataValues.id, null, null);
		}
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
		await this.notificationsApi.deleteNotification('retweets', retweetId);
		return await this.retweetsDAO.deleteRetweet(retweetId, userId);
	}
}

module.exports = RetweetsApi;