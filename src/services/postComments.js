const PostCommentsDAO = require('../database/postComments');
const UsersDAO = require('../database/users');
const NotificationsApi = require('../services/notifications');
const PostsApi = require('../services/posts');
const mention = require('../utils/mentions');
const { newCommentTitle, newCommentMessage } = require('../utils/notificationsMessages');

class PostCommentsApi{
	constructor(){
		this.postCommentsDAO = new PostCommentsDAO();
		this.usersDAO = new UsersDAO();
		this.notificationsApi = new NotificationsApi();
		this.postsApi = new PostsApi();
	}
    
	async createPostComment(userId, userUsername, comment, postId){

		await mention(comment, userId, userUsername);
		const post = await this.postsApi.getPost(postId);
		await this.notificationsApi.createNotification(newCommentTitle(), newCommentMessage(userUsername), post.user_id, 'others', null, null, null);
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