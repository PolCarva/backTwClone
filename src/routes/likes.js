const LikesController = require('../controllers/likes');
const authMiddleware = require('../middlewares/auth');
const likesRouter = require('./router');

class LikesRouter{
	constructor(){
		this.controller = new LikesController();
	}

	start(){
		likesRouter.post('/likepost/:postid', authMiddleware, this.controller.likePost);
		likesRouter.post('/likecomment/:commentid', authMiddleware, this.controller.likePostComment);
		likesRouter.post('/likecommentreply/:commentreplyid', authMiddleware, this.controller.likeCommentReply);
		likesRouter.post('/removelike/:likeid', authMiddleware, this.controller.removeLike);
		likesRouter.get('/postlikes/:postid', authMiddleware, this.controller.getPostLikes);
		likesRouter.get('/commentlikes/:commentid', authMiddleware, this.controller.getCommentLikes);
		likesRouter.get('/commentreplylikes/:commentreplyid', authMiddleware, this.controller.getCommentReplyLikes);

		return likesRouter;
	}
}

module.exports = LikesRouter;