const asyncHandler = require('express-async-handler');
const PostsApi = require('../services/posts');

class PostsController{
	constructor(){
		this.postsApi = new PostsApi();
	}

	createPost = asyncHandler(async(req, res) => {
		try {
			await this.postsApi.createPost(null, req.user.id, req.body.text, `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/post-user${req.user.id}`);
			res.json({success: true, message: 'post creado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

	getHomePosts = asyncHandler(async(req, res) => {
		try {
			const posts = await this.postsApi.getHomePosts(req.user.id);
			res.json({success: true, data: posts}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	deletePost = asyncHandler(async(req, res) => {
		try {
			await this.postsApi.deletePost(req.params.postid);
			res.json({success: true, message: 'post eliminado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getMyPosts = asyncHandler(async(req, res) => {
		try {
			const posts = await this.postsApi.getUserPosts(req.user.id);
			res.json({success: true, data: posts}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getUserPosts = asyncHandler(async(req, res) => {
		try {
			const posts = await this.postsApi.getUserPosts(req.params.usuarioid);
			res.json({success: true, data: posts}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getPost = asyncHandler(async(req, res) => {
		try {
			const post = await this.postsApi.getPost(req.params.postid);
			res.json({success: true, data: post}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

}

module.exports = PostsController;