const UsersDAO = require('../database/users');
const ResetPasswordTokenDAO = require('../database/resetPasswordToken');
const ResetPasswordToken = require('../models/resetPasswordToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const hash = require('../utils/hashing');

class AuthApi{
	constructor(){
		this.usersDAO = new UsersDAO();
		this.resetPasswordTokenDAO = new ResetPasswordTokenDAO();
	}

	async resetPasswordRequest(userMail){
		const user = await this.usersDAO.getUserByMail(userMail); 

		if (!user) {
			throw new Error('User does not exist');
		}
		let token = await this.resetPasswordTokenDAO.findOneTokenByUser(user.id);
		if (token) { 
			await this.resetPasswordTokenDAO.deleteOneToken();
		}

		let resetToken = crypto.randomBytes(32).toString('hex');

		await new ResetPasswordToken({
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
		const token = await this.resetPasswordTokenDAO.findOneTokenByToken(newToken);

		if(newPassword === confirmNewPassword){
			await this.usersDAO.updateUserPassword(token.user_id, hash(newPassword));
		}else{
			throw new Error('las contrasenias no son iguales');
		} 
	}
}

module.exports = AuthApi;