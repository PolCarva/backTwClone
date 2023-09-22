const asyncHandler = require('express-async-handler');
const PostsApi = require('../services/posts');
const RetweetsApi = require('../services/retweets');

class PostsController{
	constructor(){
		this.postsApi = new PostsApi();
		this.retweetsApi = new RetweetsApi();
	}

	createPost = asyncHandler(async(req, res) => {
		try {
			await this.postsApi.createPost(req.files?.file.tempFilePath, req.files?.file.name, req.user.id, req.body?.text, req.user.username, req.files?`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.files?.file.name}`:null );
			res.json({success: true, message: 'post creado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});  

	getHomePosts = asyncHandler(async(req, res) => {
		try {
			const {id} = req.user;
			const retweets = await this.retweetsApi.getHomeRetweets(id);
			const posts = await this.postsApi.getHomePosts(id);
			res.json({success: true, data: [{posts}, {retweets}]}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});

	deletePost = asyncHandler(async(req, res) => {
		try {
			await this.postsApi.deletePost(req.params.postid, req.user.id);
			res.json({success: true, message: 'post eliminado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});
	

	getPost = asyncHandler(async(req, res) => {
		try {
			const post = await this.postsApi.getPost(req.params.postid, req.user.id);
			res.json({success: true, data: post}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});  

}

module.exports = PostsController;