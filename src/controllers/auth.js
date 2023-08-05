const asyncHandler = require('express-async-handler');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthApi = require('../services/auth');

class AuthController{
	constructor(){
		this.authApi = new AuthApi();
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

	resetPasswordRequest = asyncHandler(async(req, res) => {
		try {
			await this.authApi.resetPasswordRequest(req.body.email);
			res.status(200).json({success: true, message: 'mail enviado'});
		} catch (error) {
			res.status(500).json({success: false, message: 'mail no enviado, probar de nuevo'});
		}
	}); 

	resetPassword = asyncHandler(async(req, res) => {
		try {
			await this.authApi.resetPassword(req.params.token, req.body.newPassword, req.body.confirmNewPassword);
			res.status(200).json({success: true, message: 'contrasenia actualizada'});
		} catch (error) {
			res.status(500).json({success: false, message: 'hubo un error ' + error});
		}
	}); 
}

module.exports = AuthController;