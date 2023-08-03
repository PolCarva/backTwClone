const asyncHandler = require('express-async-handler');
const PostCommentsApi = require('../services/postComments');

class PostCommentsController{
	constructor(){
		this.postCommentsApi = new PostCommentsApi();
	}

	createPostComment = asyncHandler(async(req, res) => {
		try {
			await this.postCommentsApi.createPostComment(req.user.id, req.body.comment, req.params.postid);
			res.json({success: true, message: 'comentario creado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

	getPostComments = asyncHandler(async(req, res) => {
		try {
			const postComments = await this.postCommentsApi.getPostComments(req.params.postid);
			res.json({success: true, data: postComments}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	/* 	deletePostComment = asyncHandler(async(req, res) => {
		try {
			await this.postsApi.deletePost(req.params.postid);
			res.json({success: true, message: 'post eliminado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	}); */

	getPostComment = asyncHandler(async(req, res) => {
		try {
			const postComment = await this.postCommentsApi.getPostComment(req.params.commentid);
			res.json({success: true, data: postComment}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

}

module.exports = PostCommentsController;