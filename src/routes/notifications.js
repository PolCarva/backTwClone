const NotificationsController = require('../controllers/notifications');
const authMiddleware = require('../middlewares/auth');
const notificationsRouter = require('./router');

class NotificationsRouter{
	constructor(){
		this.controller = new NotificationsController();
	}

	start(){
		notificationsRouter.get('/notificaciones', authMiddleware, this.controller.getAllUserNotifications);

		return notificationsRouter;
	}
}

module.exports = NotificationsRouter;