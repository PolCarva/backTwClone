const asyncHandler = require('express-async-handler');
const RetweetsApi = require('../services/retweets');
const NotificationsApi = require('../services/notifications');
const PostsApi = require('../services/posts');
const { postRetweetedTitle, postRetweetedMessage } = require('../utils/notificationsMessages');

class RetweetsController{
	constructor(){
		this.retweetsApi = new RetweetsApi();
		this.postsApi = new PostsApi();
		this.notificationsApi = new NotificationsApi();
	}

	retweet = asyncHandler(async(req, res) => {
		try {
			const {postid} = req.params;
			await this.retweetsApi.retweet(postid, req.user.id);
			const post = await this.postsApi.getPost(postid);
			await this.notificationsApi.createNotification(postRetweetedTitle(), postRetweetedMessage(req.user.username), post.user_id, 'others');
			res.json({success: true, message: 'post retuiteado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getHomeRetweets = asyncHandler(async(req, res) => {
		try {
			const retweets = await this.retweetsApi.getHomeRetweets(req.user.id);
			res.json({success: true, data: retweets}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getRetweet = asyncHandler(async(req, res) => {
		try {
			const retweet = await this.retweetsApi.getRetweet(req.params.retweetid);
			res.json({success: true, data: retweet}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

}

module.exports = RetweetsController;