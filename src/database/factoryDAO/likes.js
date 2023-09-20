const Like = require('../../models/like');
const logger = require('../../utils/logger');

class LikeFactory {
	async like(type, userId, postId, postCommentId, commentReplyId){
		try {
			switch (type) {
			case 'Tweet':
				return await Like.create({user_id: userId, post_id: postId});		  
			case 'Comentario':
				return await Like.create({user_id: userId, post_comment_id: postCommentId});		  
			case 'Reply':
				return await Like.create({user_id: userId, comment_reply_id: commentReplyId});		  
			default:
			{
				throw new Error('hubo un error');
			}
			}
		} catch (err) {
			logger.info(err);
			throw new Error(err.message);
		}
		
	}
}
  
module.exports = LikeFactory;