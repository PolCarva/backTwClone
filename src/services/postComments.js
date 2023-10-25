const PostCommentsDAO = require('../database/postComments');
const UsersDAO = require('../database/users');
const NotificationsApi = require('../services/notifications');
const mention = require('../utils/mentions');
const { newCommentTitle, newCommentMessage } = require('../utils/notificationsMessages');
const transformUserMention = require('../utils/transformUserMention');

class PostCommentsApi{
	constructor(){
		this.postCommentsDAO = new PostCommentsDAO();
		this.usersDAO = new UsersDAO();
		this.notificationsApi = new NotificationsApi();	
	}
    
	async createPostComment(userId, userUsername, comment, postId){
		const PostsApi = require('./posts');
		const postsApi = new PostsApi();

		const post = await postsApi.getPost(postId);
		await this.notificationsApi.createNotification(newCommentTitle(), newCommentMessage(userUsername), post.user_id, 'others', null, null, null);

		if(comment.includes('@')){
			let wordsWithArroba = comment.match(/\B@\S+/g);
			const transformedText = transformUserMention(wordsWithArroba, comment);
			await this.postCommentsDAO.createPostComment({user_id: userId, comment: transformedText, post_id: postId});
			await mention(transformedText, userId, userUsername, postId, 'comentario');
		}else{
			return await this.postCommentsDAO.createPostComment({user_id: userId, comment, post_id: postId});
		}
		
	}    

	async getPostComments(postId){
		return await this.postCommentsDAO.getPostComments(postId);
	}

	async deletePostComment(postCommentId, userId){
		return await this.postCommentsDAO.deletePostComment(postCommentId, userId);
	}

	async deleteAllCommentsfromPost(postId){
		return await this.postCommentsDAO.deleteAllCommentsFromPost(postId);
	}

	async getPostComment(postCommentId){
		return await this.postCommentsDAO.getPostComment(postCommentId);
	}
}

module.exports = PostCommentsApi;