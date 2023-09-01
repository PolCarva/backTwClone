const FollowingListsController = require('../controllers/followingLists');
const authMiddleware = require('../middlewares/auth');
const followingListsRouter = require('./router');

class FollowingListsRouter{
	constructor(){
		this.controller = new FollowingListsController();
	}

	start(){
		followingListsRouter.post('/seguirodejardeseguir/:userid', authMiddleware, this.controller.followOrUnfollow);

		return followingListsRouter;
	}
}

module.exports = FollowingListsRouter;