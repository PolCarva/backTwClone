const PostComment = require('../models/postComment');
const logger = require('../utils/logger');

class PostCommentsDAO{

	async createPostComment(newPostComment){
		try{
			return await PostComment.create(newPostComment);
		}catch(err){
			logger.info(err);
		}
	}

	async getPostComments(postId){
		try{
			return await PostComment.findAll({
				where: {
					post_id: postId
				},
				order: [
					['created_at', 'DESC']
				]
			});
		}catch(err){
			logger.info(err);
		}
	}

	async deletePostComment(postCommentId, userId){
		try{
			return await PostComment.destroy({
				where:{
					id: postCommentId,
					user_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	} 

	async deleteAllCommentsFromPost(postId){
		try{
			return await PostComment.destroy({
				where:{
					post_id: postId,
				}
			});
		}catch(err){
			logger.info(err);
		}
	} 

	async getPostComment(postCommentId){
		try{
			return await PostComment.findByPk(postCommentId);
		}catch(err){
			logger.info(err);
		}
	}
}

module.exports = PostCommentsDAO;