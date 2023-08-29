const LikesDAO = require('../database/likes');
const NotificationsApi = require('../services/notifications');
const PostsApi = require('../services/posts');
const PostCommentsApi = require('../services/postComments');
const CommentRepliesApi = require('../services/commentReplies');
const { likeTitle, likeMessage } = require('../utils/notificationsMessages');

class LikesApi{
	constructor(){
		this.likesDAO = new LikesDAO();
		this.notificationsApi = new NotificationsApi();
		this.postsApi = new PostsApi();
		this.postCommentsApi = new PostCommentsApi();
		this.commentRepliesApi = new CommentRepliesApi();
	}
    
	async likePost(userUsername, userId, postId){
		const post = await this.postsApi.getPost(postId);
		const user = post.dataValues.user_id;
		this.notificationsApi.createNotification(likeTitle(), likeMessage(userUsername, 'post'), user, 'like');
		return await this.likesDAO.createLike({user_id: userId, post_id: postId});
	}

	async likePostComment(userUsername, userId, commentId){
		const postComment = await this.postCommentsApi.getPostComment(commentId);
		const user = postComment.dataValues.user_id;
		this.notificationsApi.createNotification(likeTitle(), likeMessage(userUsername, 'comentario'), user, 'like');
		return await this.likesDAO.createLike({user_id: userId, comment_id: commentId});
	}    

	async likeCommentReply(userUsername, userId, commentReplyId){
		const commentReply = await this.commentRepliesApi.getCommentReply(commentReplyId);
		const user = commentReply.dataValues.user_id;
		this.notificationsApi.createNotification(likeTitle(), likeMessage(userUsername, 'respuesta'), user, 'like');
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