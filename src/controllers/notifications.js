const asyncHandler = require('express-async-handler');
const NotificationsApi = require('../services/notifications');

class NotificationsController{
	constructor(){
		this.notificationsApi = new NotificationsApi();
	}

	getAllUserNotifications = asyncHandler(async(req, res) => {
		try {
			const notifications = await this.notificationsApi.getAllUserNotifications(req.user.id);
			res.json({success: true, data: notifications}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

}

module.exports = NotificationsController;