const asyncHandler = require('express-async-handler');
const LikesApi = require('../services/likes');

class LikesController{
	constructor(){
		this.likesApi = new LikesApi();
	}

	likePost = asyncHandler(async(req, res) => {
		try {
			await this.likesApi.likePost(req.user.id, req.params.postid);
			res.json({success: true, message: 'post likeado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

	likePostComment = asyncHandler(async(req, res) => {
		try {
			await this.likesApi.likePostComment(req.user.id, req.params.commentid);
			res.json({success: true, message: 'comentario likeado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	likeCommentReply = asyncHandler(async(req, res) => {
		try {
			await this.likesApi.likeCommentReply(req.user.id, req.params.commentreplyid);
			res.json({success: true, message: 'respuesta a comentario likeada'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	removeLike = asyncHandler(async(req, res) => {
		try {
			await this.likesApi.removeLike(req.user.id, req.params.likeid);
			res.json({success: true, message: 'like elminado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getPostLikes = asyncHandler(async(req, res) => {
		try {
			const likes = await this.likesApi.getPostLikes(req.params.postid);
			res.json({success: true, data: likes}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getCommentLikes = asyncHandler(async(req, res) => {
		try {
			const likes = await this.likesApi.getPostCommentLikes(req.params.commentid);
			res.json({success: true, data: likes}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getCommentReplyLikes = asyncHandler(async(req, res) => {
		try {
			const likes = await this.likesApi.getCommentReplyLikes(req.params.commentreplyid);
			res.json({success: true, data: likes}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

}

module.exports = LikesController;