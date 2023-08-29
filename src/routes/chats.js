const ChatsController = require('../controllers/chats');
const authMiddleware = require('../middlewares/auth');
const chatsRouter = require('./router');

class ChatsRouter{
	constructor(){
		this.controller = new ChatsController();
	}

	start(){
		chatsRouter.post('/crearchat/:userid', authMiddleware, this.controller.createChat);
		chatsRouter.get('/mischats', authMiddleware, this.controller.getMyChats);
		
		return chatsRouter;
	}
}

module.exports = ChatsRouter;