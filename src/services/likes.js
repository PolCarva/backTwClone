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
    
	async like(userUsername, userId, postId, commentId, commentReplyId){
		if(postId !== null){
			const post = await this.postsApi.getPost(postId);
			const user = post.dataValues.user_id;
			const like = await this.likesDAO.like('Tweet', userId, postId, null, null);
			await this.notificationsApi.createNotification(likeTitle(), likeMessage(userUsername, 'Tweet'), user, 'like', null, like.dataValues.id, null);
			return like;
		}

		if(commentId !== null){
			const postComment = await this.postCommentsApi.getPostComment(commentId);
			const user = postComment.dataValues.user_id;
			const like = await this.likesDAO.like('Comentario', userId, null, commentId, null);
			await this.notificationsApi.createNotification(likeTitle(), likeMessage(userUsername, 'Comentario'), user, 'like', null, like.dataValues.id, null);
		}

		if(commentReplyId !== null){
			const commentReply = await this.commentRepliesApi.getCommentReply(commentReplyId);
			const user = commentReply.dataValues.user_id;
			const like = await this.likesDAO.like('Reply', userId, null, commentId, null);
			await this.notificationsApi.createNotification(likeTitle(), likeMessage(userUsername, 'Reply'), user, 'like', null, like.dataValues.id, null);
		}
	}

	async removeLike(userId, likeId){
		await this.notificationsApi.notificationsDAO.deleteNotification('like', likeId);
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