const CommentReply = require('../models/commentReply');
const logger = require('../utils/logger');

class CommentRepliesDAO{

	async createCommentReply(newCommentReply){
		try{
			return await CommentReply.create(newCommentReply);
		}catch(err){
			logger.info(err);
		}
	}

	async getCommentReplies(commentId){
		try{
			return await CommentReply.findAll({
				where: {
					comment_id: commentId
				},
				order: [
					['created_at', 'DESC']
				]
			});
		}catch(err){
			logger.info(err);
		}
	}

	async deleteCommentReply(commentReplyId, userId){
		try{
			return await CommentReply.destroy({
				where:{
					id: commentReplyId,
					user_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	} 

	async getCommentReply(commentReplyId){
		try{
			return await CommentReply.findByPk(commentReplyId);
		}catch(err){
			logger.info(err);
		}
	}
}

module.exports = CommentRepliesDAO;