const asyncHandler = require('express-async-handler');
const RetweetsApi = require('../services/retweets');

class RetweetsController{
	constructor(){
		this.retweetsApi = new RetweetsApi();
	}

	retweet = asyncHandler(async(req, res) => {
		try {
			await this.retweetsApi.retweet(req.user.id, req.params.postid, req.user.username);
			res.json({success: true, message: `post retuiteado por ${req.user.username}`}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});
	
	getRetweet = asyncHandler(async(req, res) => {
		try {
			const retweet = await this.retweetsApi.getRetweet(req.params.retweetid);
			res.json({success: true, data: retweet}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});  

	deleteRetweet = asyncHandler(async(req, res) => {
		try {
			const retweet = await this.retweetsApi.deleteRetweet(req.params.retweetid, req.user.id);
			res.json({success: true, data: retweet}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});  

}

module.exports = RetweetsController;