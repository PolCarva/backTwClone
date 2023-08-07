const UsersDAO = require('../database/users');
const TokenDAO = require('../database/token');
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const hash = require('../utils/hashing');

class AuthApi{
	constructor(){
		this.usersDAO = new UsersDAO();
		this.TokenDAO = new TokenDAO();
	}

	async verificateEmail(userEmail, userId){
		let verificateEmailToken = crypto.randomBytes(32).toString('hex');

		await new Token({
			user_id: userId,
			token: verificateEmailToken
		}).save();
		//CAMBIAR URL EN PRODUCCION
		let resetUrl = `${process.env.URL}/api/confirmaremail/${verificateEmailToken}`;

		let message = `
        <h2>BIENVENIDO!</h2>
        <p>hace en click en la url proporcionada para confirmar tu cuenta de email</p>
        <p>el link es valido por una hora</p> 
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;
        

		let from = process.env.EMAIL_USER;

		let to = userEmail;

		let subject = 'Activar cuenta';

		await sendEmail(from, to, subject, message);
	}

	async validateUser(tokenParam){
		const newToken = tokenParam.slice(0, -1);
		const token = await this.TokenDAO.findOneTokenByToken(newToken);
		
		await this.usersDAO.activateUser(token.user_id);
	}

	async deleteUserIfNotValidated(){
		
	}

	async resetPasswordRequest(userMail){
		const user = await this.usersDAO.getUserByMail(userMail); 

		if (!user) {
			throw new Error('User does not exist');
		}
		let token = await this.TokenDAO.findOneTokenByUser(user.id);
		if (token) { 
			await this.TokenDAO.deleteOneToken();
		}

		let resetToken = crypto.randomBytes(32).toString('hex');

		await new Token({
			user_id: user.id,
			token: resetToken
		}).save();

		let resetUrl = `${process.env.URL}/resetpassword/${resetToken}`;

		let message = `
        <h2>HOLA ${user.username}!</h2>
        <p>hace en click en la url proporcionada para cambiar tu contrasenia</p>
        <p>el link es valido por una hora</p> 
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Saludos...</p> `;
        

		let from = process.env.EMAIL_USER;

		let to = user.email;

		let subject = 'Cambiar contrasenia';

		await sendEmail(from, to, subject, message);
	}

	async resetPassword(tokenParam, newPassword, confirmNewPassword){
		const newToken = tokenParam.slice(0, -1);
		const token = await this.TokenDAO.findOneTokenByToken(newToken);

		if(newPassword === confirmNewPassword){
			await this.usersDAO.updateUserPassword(token.user_id, hash(newPassword));
		}else{
			throw new Error('las contrasenias no son iguales');
		} 
	}

	async findOneTokenByToken(tokenParam){
		const newToken = tokenParam.slice(0, -1);
		return await this.TokenDAO.findOneTokenByToken(newToken);
	}
}

module.exports = AuthApi;