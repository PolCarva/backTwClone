const Notification = require('../../models/notification');
const logger = require('../../utils/logger');

class NotificationFactory {
	async createNotification(title, message, userId, notificationType, retweetId, likeId, postId){
		try {
			switch (notificationType) {
			case 'retweets':
				return await Notification.create({title, message, user_id: userId, notification_type: 'retweets', retweet_id: retweetId});		  
			case 'like':
				return await Notification.create({title, message, user_id: userId, notification_type: 'like', like_id: likeId});		  
			case 'mention':
				return await Notification.create({title, message, user_id: userId, notification_type: 'mention', post_id: postId});	
			case 'others':
				return await Notification.create({title, message, user_id: userId, notification_type: 'others'});	    	  
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
    
	async deleteNotification(notificationType, id){
		try {
			switch (notificationType) {
			case 'retweets':
				return await Notification.destroy({
					where: {
						retweet_id: id
					}
				});		  
			case 'like':
				return await Notification.destroy({
					where: {
						like_id: id
					}
				});		  
			case 'mention':
				return await Notification.destroy({
					where:{
						post_id: id
					}
				});	
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

module.exports = NotificationFactory;