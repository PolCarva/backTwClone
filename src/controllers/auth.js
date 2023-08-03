const asyncHandler = require('express-async-handler');
const passport = require('passport');
const jwt = require('jsonwebtoken');
//const AuthApi = require('../services/auth');

class AuthController{
	constructor(){
		//this.authApi = new AuthApi();
	}

	postRegistro = asyncHandler(async(req, res, next) => {
		passport.authenticate('register', function(err, user, info) {
			if (err) { 
				return next(err); 
			}
			if (!user) {
				return res.status(400).json({ message: info.message });
			}
			req.login(user,
				{ session: false },
				async (error) => {
					if (error) return next(error);              
					const token = jwt.sign({ id: user.id}, 'adsfdcsfeds3w423ewdas');
    
					return res.status(201).json({ message: 'usuario registrado', user: req.user, token: `${token}` });
				});
		})(req, res, next);
	});  


	postLogin = asyncHandler(async (req, res, next) => {
		passport.authenticate('login', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({ message: info.message });
			}
			req.login(user,
				{ session: false },
				async (error) => {
					if (error) return next(error);            
					const token = jwt.sign({ id: user.id}, 'adsfdcsfeds3w423ewdas');
					return res.status(201).json({ message: 'sesion iniciada', token: `${token}` });
				});
		})(req, res, next);
	});
}

module.exports = AuthController;