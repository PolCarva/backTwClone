const NotificationsDAO = require('../database/notifications');

class NotificationsApi{
	constructor(){
		this.notificationsDAO = new NotificationsDAO();
	}
    
	async createNotification(title, message, userId){
		return await this.notificationsDAO.createNotification(title, message, userId);
	}

	async getAllUserNotifications(userId){
		return await this.notificationsDAO.getAllUserNotifications(userId);
	}   

	async mentions(){
		
	}    

}

module.exports = NotificationsApi;