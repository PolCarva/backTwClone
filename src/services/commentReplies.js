const CommentRepliesDAO = require('../database/commentReplies');
const mention = require('../utils/mentions');

class CommentRepliesApi{
	constructor(){
		this.commentRepliesDAO = new CommentRepliesDAO();
	}
    
	async createCommentReply(userId, reply, commentId, userUsername){
		await mention(reply, userId, userUsername);
		return await this.commentRepliesDAO.createCommentReply({user_id: userId, reply, comment_id: commentId});
	}    

	async getCommentReplies(commentId){
		return await this.commentRepliesDAO.getCommentReplies(commentId);
	}

	async getCommentReply(commentReplyId){
		return await this.commentRepliesDAO.getCommentReply(commentReplyId);
	}

	async deleteCommentReply(commentReplyId, userId){
		return await this.commentRepliesDAO.deleteCommentReply(commentReplyId, userId);
	} 

}

module.exports = CommentRepliesApi;