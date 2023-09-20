const NotificationsDAO = require('../database/notifications');

class NotificationsApi{
	constructor(){
		this.notificationsDAO = new NotificationsDAO();
	}
    
	async createNotification(title, message, userId, notificationType, retweetId, likeId, postId){
		return await this.notificationsDAO.createNotification(title, message, userId, notificationType, retweetId, likeId, postId);
	}

	async getUserNotificationByMessage(userId, message){
		return await this.notificationsDAO.getUserNotificationByMessage(userId, message);
	}  

	async getUserNotifications(userId, notificationType){
		await this.notificationsDAO.markNotificationAsReaded();
		return await this.notificationsDAO.getUserNotifications(userId, notificationType);
	}   

	async deleteNotification(notificationType, id){
		return await this.notificationsDAO.deleteNotification(notificationType, id);
	}
}

module.exports = NotificationsApi;