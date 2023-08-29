const asyncHandler = require('express-async-handler');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const AuthApi = require('../services/auth');
const UsersApi = require('../services/users');
const NotificationsApi = require('../services/notifications');
const { welcomeMessage, welcomeTitle } = require('../utils/notificationsMessages');

class AuthController{
	constructor(){
		this.authApi = new AuthApi();
		this.usersApi = new UsersApi();
		this.notificationsApi = new NotificationsApi();
	}

	postRegistro = asyncHandler(async(req, res, next) => {
		const newUserPromise = new Promise((resolve, reject) => {
			passport.authenticate('register', async function (err, user, info) {
				if (err) {
					return reject(err);
				}
				if (!user) {
					return res.status(400).json({ message: info.message });
				}
				req.login(user, { session: false }, async (error) => {
					if (error) return reject(error);
					resolve(user);
				});
			})(req, res, next);
		});
		
		try {
			const newUser = await newUserPromise;
			await this.authApi.verificateEmail(newUser.email, newUser.id);
			res.status(201).json({ success: true, message: 'usuario registrado, verificar mail', user: newUser });
		} catch (err) {
			next(err);
		}
	});	  

	validateUser = asyncHandler(async (req, res) => {
		try {
			const {token} = req.params;
			await this.authApi.validateUser(token);
			const user = await this.authApi.findOneTokenByToken(token);
			const jwtToken = jwt.sign({ id: user.dataValues.user_id}, 'adsfdcsfeds3w423ewdas');
			await this.notificationsApi.createNotification(welcomeTitle(), welcomeMessage(), user.id, 'others');
			res.status(201).json({ success: true, message: 'usuario validado', token: jwtToken  });
		} catch (error) {
			console.log(error);
			res.status(500).json({success: false, message: 'hubo un error ' + error});
		}
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
					return res.status(201).json({ success: true, message: 'sesion iniciada', token: `${token}`, user });
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