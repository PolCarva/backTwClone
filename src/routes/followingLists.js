const FollowingListsController = require('../controllers/followingLists');
const authMiddleware = require('../middlewares/auth');
const followingListsRouter = require('./router');

class FollowingListsRouter{
	constructor(){
		this.controller = new FollowingListsController();
	}

	start(){
		followingListsRouter.get('/listadeseguidos/:userid', authMiddleware, this.controller.getFollowingList);
		followingListsRouter.post('/seguir/:userid', authMiddleware, this.controller.addUserToFollowingList);

		return followingListsRouter;
	}
}

module.exports = FollowingListsRouter;