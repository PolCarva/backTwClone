const asyncHandler = require('express-async-handler');
const CommentRepliesApi = require('../services/commentReplies');
const NotificationsApi = require('../services/notifications');
const { newCommentReplyMessage, newCommentReplyTitle } = require('../utils/notificationsMessages');
const PostCommentsApi = require('../services/postComments');

class CommentRepliesController{
	constructor(){
		this.commentRepliesApi = new CommentRepliesApi();
		this.postCommentsApi = new PostCommentsApi();
		this.notificationsApi = new NotificationsApi();
	}

	createCommentReply = asyncHandler(async(req, res) => {
		try {
			const {commentid} = req.params;
			await this.commentRepliesApi.createCommentReply(req.user.id, req.body.reply, commentid);
			const comment = await this.postCommentsApi.getPostComment(commentid);
			await this.notificationsApi.createNotification(newCommentReplyMessage(), newCommentReplyTitle(req.user.username), comment.user_id);
			res.json({success: true, message: 'respuesta al comentario creada'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

	getPostComments = asyncHandler(async(req, res) => {
		try {
			const commentsReplies = await this.commentRepliesApi.getCommentReplies(req.params.commentid);
			res.json({success: true, data: commentsReplies}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});
}

module.exports = CommentRepliesController;