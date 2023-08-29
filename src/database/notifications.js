const Notification = require('../models/notification');
const logger = require('../utils/logger');

class NotificationsDAO{

	async createNotification(title, message, userId, notificationType){
		try{
			return await Notification.create({title, message, user_id: userId, notification_type: notificationType});
		}catch(err){
			logger.info(err);
		}
	}

	async getUserNotifications(userId, notificationType){
		try{
			return await Notification.findAll({
				where:{
					user_id: userId,
					notification_type: notificationType
				}
			});
		}catch(err){
			logger.info(err);
		}
	}

	async markNotificationAsReaded(){
		try {
			return await Notification.update({ readed: true }, {
				where: {
					readed: false,
				},
			});
		} catch (err) {
			logger.info(err);
		}
	}

	async mentions(){
		try{
			
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = NotificationsDAO;