const NotificationsDAO = require('../database/notifications');

class NotificationsApi{
	constructor(){
		this.notificationsDAO = new NotificationsDAO();
	}
    
	async createNotification(title, message, userId, notificationType){
		return await this.notificationsDAO.createNotification(title, message, userId, notificationType);
	}

	async getUserNotificationByMessage(userId, message){
		return await this.notificationsDAO.getUserNotificationByMessage(userId, message);
	}  

	async getUserNotifications(userId, notificationType){
		await this.notificationsDAO.markNotificationAsReaded();
		return await this.notificationsDAO.getUserNotifications(userId, notificationType);
	}   


}

module.exports = NotificationsApi;