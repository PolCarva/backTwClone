const AuthController = require('../controllers/auth');
const authRouter = require('./router');

class AuthRouter{
	constructor(){
		this.controller = new AuthController();
	}

	start(){
		authRouter.post('/register', this.controller.postRegistro);
		authRouter.post('/login', this.controller.postLogin);
		//authRouter.get('/logout', this.controller.getLogout);

		return authRouter;
	}
}

module.exports = AuthRouter;