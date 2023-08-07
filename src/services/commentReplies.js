const CommentRepliesDAO = require('../database/commentReplies');

class CommentRepliesApi{
	constructor(){
		this.commentRepliesDAO = new CommentRepliesDAO();
	}
    
	async createCommentReply(userId, reply, commentId){
		return await this.postCommentsDAO.createPostComment({user_id: userId, reply, comment_id: commentId});
	}    

	async getCommentReplies(commentId){
		return await this.postCommentsDAO.getPostComments(commentId);
	}

	/* 	async deletePostComment(postId){

	} */

/* 	async getCommentReply(commentReplyId){
		return await this.postCommentsDAO.getPostComment(commentReplyId);
	} */
}

module.exports = CommentRepliesApi;