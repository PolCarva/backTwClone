const FollowersListsController = require('../controllers/followersLists');
const authMiddleware = require('../middlewares/auth');
const followersListsRouter = require('./router');

class FollowersListsRouter{
	constructor(){
		this.controller = new FollowersListsController();
	}

	start(){
		followersListsRouter.get('/listadeseguidores/:userid', authMiddleware, this.controller.getFollowersList);

		return followersListsRouter;
	}
}

module.exports = FollowersListsRouter;