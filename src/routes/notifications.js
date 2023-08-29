const NotificationsController = require('../controllers/notifications');
const authMiddleware = require('../middlewares/auth');
const notificationsRouter = require('./router');

class NotificationsRouter{
	constructor(){
		this.controller = new NotificationsController();
	}

	start(){
		notificationsRouter.get('/notificaciones/:notificationstype', authMiddleware, this.controller.getUserNotifications);

		return notificationsRouter;
	}
}

module.exports = NotificationsRouter;