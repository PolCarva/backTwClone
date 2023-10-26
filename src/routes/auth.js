const AuthController = require('../controllers/auth');
const authRouter = require('./router');

class AuthRouter{
	constructor(){
		this.controller = new AuthController();
	}

	start(){
		authRouter.post('/register', this.controller.postRegistro);
		authRouter.get('/confirmaremail/:token', this.controller.validateUser);
		authRouter.post('/login', this.controller.postLogin);
		authRouter.post('/resetpasswordrequest', this.controller.resetPasswordRequest);
		authRouter.get('/resetpassword/:token', this.controller.resetPasswordUI);
		authRouter.post('/resetpassword/:token', this.controller.resetPassword);
		
		return authRouter;
	}
}

module.exports = AuthRouter;