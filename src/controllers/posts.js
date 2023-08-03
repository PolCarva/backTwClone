const asyncHandler = require('express-async-handler');
const PostsApi = require('../services/posts');

class PostsController{
	constructor(){
		this.postsApi = new PostsApi();
	}

	createPost = asyncHandler(async(req, res) => {
		try {
			await this.postsApi.createPost(req.user.id, req.body.text);
			res.json({success: true, message: 'post creado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

	getPosts = asyncHandler(async(req, res) => {
		try {
			const posts = await this.postsApi.getPosts(req.user.id);
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
			const posts = await this.postsApi.getMyPosts(req.user.id);
			res.json({success: true, data: posts}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getUserPosts = asyncHandler(async(req, res) => {
		try {
			const posts = await this.postsApi.getMyPosts(req.params.usuarioid);
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