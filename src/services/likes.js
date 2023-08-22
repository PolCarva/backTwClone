const LikesDAO = require('../database/likes');

class LikesApi{
	constructor(){
		this.likesDAO = new LikesDAO();
	}
    
	async likePost(userId, postId){
		return await this.likesDAO.createLike({user_id: userId, post_id: postId});
	}

	async likePostComment(userId, commentId){
		return await this.likesDAO.createLike({user_id: userId, comment_id: commentId});
	}    

	async likeCommentReply(userId, commentReplyId){
		return await this.likesDAO.createLike({user_id: userId, comment_reply_id: commentReplyId});
	}    

	async removeLike(userId, likeId){
		return await this.likesDAO.removeLike(userId, likeId);
	} 

	async getPostLikes(postId){
		return await this.likesDAO.getPostsLikes(postId);
	}

	async getPostCommentLikes(postCommentId){
		return await this.likesDAO.getPostCommentsLikes(postCommentId);
	}

	async getCommentReplyLikes(commentReplyId){
		return await this.likesDAO.getCommentRepliesLikes(commentReplyId);
	}
}

module.exports = LikesApi;