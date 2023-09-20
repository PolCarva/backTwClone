const asyncHandler = require('express-async-handler');
const LikesApi = require('../services/likes');

class LikesController{
	constructor(){
		this.likesApi = new LikesApi();
	}

	like = asyncHandler(async(req, res) => {
		try {
			if(req.params.tipo === 'Tweet'){
				await this.likesApi.like(req.user.username, req.user.id, req.params.id, null, null);
				res.json({success: true, message: 'post likeado'}).status(200);
			}else if(req.params.tipo === 'Comentario'){
				await this.likesApi.like(req.user.username, req.user.id, null, req.params.id, null);
				res.json({success: true, message: 'comentario likeado'}).status(200);
			}else if(req.params.tipo === 'Reply'){
				await this.likesApi.like(req.user.username, req.user.id, null, null, req.params.id,);
				res.json({success: true, message: 'respuesta likeada'}).status(200);
			}			
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});  

	removeLike = asyncHandler(async(req, res) => {
		try {
			await this.likesApi.removeLike(req.user.id, req.params.likeid);
			res.json({success: true, message: 'like elminado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
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