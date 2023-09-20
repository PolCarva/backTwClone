const LikesController = require('../controllers/likes');
const authMiddleware = require('../middlewares/auth');
const likesRouter = require('./router');

class LikesRouter{
	constructor(){
		this.controller = new LikesController();
	}

	start(){
		likesRouter.post('/like/:tipo/:id', authMiddleware, this.controller.like);
		likesRouter.post('/removelike/:likeid', authMiddleware, this.controller.removeLike);
		likesRouter.get('/postlikes/:postid', authMiddleware, this.controller.getPostLikes);
		likesRouter.get('/commentlikes/:commentid', authMiddleware, this.controller.getCommentLikes);
		likesRouter.get('/commentreplylikes/:commentreplyid', authMiddleware, this.controller.getCommentReplyLikes);

		return likesRouter;
	}
}

module.exports = LikesRouter;