const UsersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const usersRouter = require('./router');

class UsersRouter{
	constructor(){
		this.controller = new UsersController();
	}

	start(){
		usersRouter.post('/actualizarperfil', authMiddleware, this.controller.updateUserData);
		usersRouter.get('/miperfil', authMiddleware, this.controller.getMyProfile);
		usersRouter.get('/perfilusuario/:userid', authMiddleware, this.controller.getUserProfile);
		usersRouter.get('/usuarios', authMiddleware, this.controller.getAllUsers);
		return usersRouter;
	}
}

module.exports = UsersRouter;