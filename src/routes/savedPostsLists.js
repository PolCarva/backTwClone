const SavedPostsListsController = require('../controllers/savedPostsLists');
const authMiddleware = require('../middlewares/auth');
const savedPostsListsRouter = require('./router');

class SavedPostsListsRouter{
	constructor(){
		this.controller = new SavedPostsListsController();
	}

	start(){
		savedPostsListsRouter.get('/guardados', authMiddleware, this.controller.getSavedPostsLists);
		savedPostsListsRouter.post('/agregaraguardados/:postid', authMiddleware, this.controller.addPostToSavedPostsLists);
		savedPostsListsRouter.post('/eliminardeguardados/:postid', authMiddleware, this.controller.removePostFromSavedPostsLists);

		return savedPostsListsRouter;
	}
}

module.exports = SavedPostsListsRouter;