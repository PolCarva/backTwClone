const PostCommentsDAO = require('../database/postComments');
const UsersDAO = require('../database/users');
const NotificationsDAO = require('../database/notifications');
const mention = require('../utils/mentions');

class PostCommentsApi{
	constructor(){
		this.postCommentsDAO = new PostCommentsDAO();
		this.usersDAO = new UsersDAO();
		this.notificationsDAO = new NotificationsDAO();
	}
    
	async createPostComment(userId, userUsername, comment, postId){
		
		await mention(comment, userId, userUsername);
		return await this.postCommentsDAO.createPostComment({user_id: userId, comment, post_id: postId});
	}    

	async getPostComments(postId){
		return await this.postCommentsDAO.getPostComments(postId);
	}

	async deletePostComment(postId, userId){
		return await this.postCommentsDAO.deletePostComment(postId, userId);
	}

	async getPostComment(postCommentId){
		return await this.postCommentsDAO.getPostComment(postCommentId);
	}
}

module.exports = PostCommentsApi;