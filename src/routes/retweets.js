const RetweetsController = require('../controllers/retweets');
const authMiddleware = require('../middlewares/auth');
const retweetsRouter = require('./router');

class RetweetsRouter{
	constructor(){
		this.controller = new RetweetsController();
	}

	start(){
		retweetsRouter.post('/retuitear/:postid', authMiddleware, this.controller.retweet);
		retweetsRouter.post('/eliminarretweet/:retweetid', authMiddleware, this.controller.deleteRetweet);
		retweetsRouter.get('/retweet/:retweetid', authMiddleware, this.controller.getRetweet);

		return retweetsRouter;
	}
}

module.exports = RetweetsRouter;