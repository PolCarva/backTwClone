const CommentRepliesController = require('../controllers/commentReplies');
const authMiddleware = require('../middlewares/auth');
const commentRepliesRouter = require('./router');

class CommentRepliesRouter{
	constructor(){
		this.controller = new CommentRepliesController();
	}

	start(){
		commentRepliesRouter.post('/:postid/:commentid/respondercomentario', authMiddleware, this.controller.createCommentReply);
		commentRepliesRouter.get('/:postid/comentarios/:commentid', authMiddleware, this.controller.getPostComments);

		return commentRepliesRouter;
	}
}

module.exports = CommentRepliesRouter;