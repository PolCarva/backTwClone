const RetweetsController = require('../controllers/retweets');
const authMiddleware = require('../middlewares/auth');
const retweetsRouter = require('./router');

class RetweetsRouter{
	constructor(){
		this.controller = new RetweetsController();
	}

	start(){
		retweetsRouter.post('/retuitear/:postid', authMiddleware, this.controller.retweet);
		retweetsRouter.get('/retweets', authMiddleware, this.controller.getHomeRetweets);
		//retweetsRouter.post('/eliminarretweet/:retweetid', authMiddleware, this.controller.deletePost);
		retweetsRouter.get('/misretweets', authMiddleware, this.controller.getMyRetweets);
		retweetsRouter.get('/retweets/:userid', authMiddleware, this.controller.getUserRetweets);
		retweetsRouter.get('/retweet/:retweetid', authMiddleware, this.controller.getRetweet);

		return retweetsRouter;
	}
}

module.exports = RetweetsRouter;