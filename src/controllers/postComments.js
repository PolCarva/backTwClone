const asyncHandler = require('express-async-handler');
const PostCommentsApi = require('../services/postComments');
const NotificationsApi = require('../services/notifications');
const { newCommentTitle, newCommentMessage } = require('../utils/notificationsMessages');
const PostsApi = require('../services/posts');

class PostCommentsController{
	constructor(){
		this.postCommentsApi = new PostCommentsApi();
		this.postsApi = new PostsApi();
		this.notificationsApi = new NotificationsApi();
	}

	createPostComment = asyncHandler(async(req, res) => {
		try {
			const {postid} = req.params;
			await this.postCommentsApi.createPostComment(req.user.id, req.body.comment, postid);
			const post = await this.postsApi.getPost(postid);
			await this.notificationsApi.createNotification(newCommentTitle(), newCommentMessage(req.user.username), post.user_id);
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