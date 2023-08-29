const MessagesController = require('../controllers/messages');
const authMiddleware = require('../middlewares/auth');
const messagesRouter = require('./router');

class MessagesRouter{
	constructor(){
		this.controller = new MessagesController();
	}

	start(){
		messagesRouter.post('/enviarmensaje/:chatid', authMiddleware, this.controller.createMessage);
		messagesRouter.get('/mensajes/:chatid', authMiddleware, this.controller.getMessagesInChat);
		
		return messagesRouter;
	}
}

module.exports = MessagesRouter;