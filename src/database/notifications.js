const Notification = require('../models/notification');
const logger = require('../utils/logger');

class NotificationsDAO{

	async createNotification(title, message, userId){
		try{
			return await Notification.create({title, message, user_id: userId});
		}catch(err){
			logger.info(err);
		}
	}

	async getAllUserNotifications(userId){
		try{
			return await Notification.findAll({
				where:{
					user_id: userId
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