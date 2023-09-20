const Like = require('../models/like');
const LikeFactory = require('./factoryDAO/likes');
const logger = require('../utils/logger');

class LikesDAO extends LikeFactory{
	constructor(){
		super();
	}

	async removeLike(userId, likeId){
		try{
			return await Like.destroy({
				where: {
					id: likeId,
					user_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	} 

	async getPostsLikes(postId){
		try{
			return await Like.findAll({
				where:{
					post_id: postId
				}
			});
		}catch(err) {
			logger.info(err);
		}
	}

	async getPostCommentsLikes(postCommentsId){
		try {
			return await Like.findAll({
				where:{
					post_comment_id: postCommentsId
				}
			});
		} catch (err) {
			logger.info(err);
		}
	}

	async getCommentRepliesLikes(commentReplyId){
		try {
			return await Like.findAll({
				where:{
					comment_reply_id: commentReplyId
				}
			});
		} catch (err) {
			logger.info(err);
		}
	}

}

module.exports = LikesDAO;