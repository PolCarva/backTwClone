const PostCommentsDAO = require('../database/postComments');

class PostCommentsApi{
	constructor(){
		this.postCommentsDAO = new PostCommentsDAO();
	}
    
	async createPostComment(userId, comment, postId){
		return await this.postCommentsDAO.createPostComment({user_id: userId, comment, post_id: postId});
	}    

	async getPostComments(postId){
		return await this.postCommentsDAO.getPostComments(postId);
	}

	async deletePostComment(postId){

	}

	async getPostComment(postCommentId){
		return await this.postCommentsDAO.getPostComment(postCommentId);
	}
}

module.exports = PostCommentsApi;