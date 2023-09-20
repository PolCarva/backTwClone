const Notification = require('../models/notification');
const logger = require('../utils/logger');
const NotificationFactory = require('./factoryDAO/notifications');

class NotificationsDAO extends NotificationFactory{
	constructor(){
		super();
	}

	async getUserNotificationByMessage(userId, message){
		try {
			return await Notification.findOne({
				where: {
					user_id: userId,
					message
				}
			});
		} catch (err) {
			logger.info(err);
			throw new Error(err);
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
			return await Notification.update({ 
				readed: true 
			}, {
				where: {
					readed: false,
				},
			});
		} catch (err) {
			logger.info(err);
		}
	}

}

module.exports = NotificationsDAO;