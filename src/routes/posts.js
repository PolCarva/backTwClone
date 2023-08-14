const PostsController = require('../controllers/posts');
const authMiddleware = require('../middlewares/auth');
const postsRouter = require('./router');

class PostsRouter{
	constructor(){
		this.controller = new PostsController();
	}

	start(){
		postsRouter.post('/crearpost', authMiddleware, this.controller.createPost);
		postsRouter.get('/posts', authMiddleware, this.controller.getHomePosts);
		postsRouter.post('/eliminarpost/:postid', authMiddleware, this.controller.deletePost);
		postsRouter.get('/misposts', authMiddleware, this.controller.getMyPosts);
		postsRouter.get('/postsusuario/:usuarioid', authMiddleware, this.controller.getUserPosts);
		postsRouter.get('/post/:postid', authMiddleware, this.controller.getPost);

		return postsRouter;
	}
}

module.exports = PostsRouter;