const PostCommentsController = require('../controllers/postComments');
const authMiddleware = require('../middlewares/auth');
const postCommentsRouter = require('./router');

class PostCommentsRouter{
	constructor(){
		this.controller = new PostCommentsController();
	}

	start(){
		postCommentsRouter.post('/:postid/crearcomentario', authMiddleware, this.controller.createPostComment);
		postCommentsRouter.get('/:postid/comentarios/:commentid', authMiddleware, this.controller.getPostComment);

		return postCommentsRouter;
	}
}

module.exports = PostCommentsRouter;