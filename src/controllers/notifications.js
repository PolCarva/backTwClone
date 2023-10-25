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

	getUserNotifications = asyncHandler(async(req, res) => {
		try {
			const notifications = await this.notificationsApi.getUserNotifications(req.user.id, req.params.notificationstype);
			res.json({success: true, data: notifications}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	markNotificationAsReaded = asyncHandler(async(req, res) => {
		try {
			await this.notificationsApi.markNotificationAsReaded(req.user.id);
			res.json({success: true, message: 'notificacion/es leida/s'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

}

module.exports = NotificationsController;