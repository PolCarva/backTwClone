const ResetPasswordToken = require('../models/resetPasswordToken');
const logger = require('../utils/logger');

class ResetPasswordTokenDAO{

	async findOneTokenByToken(token){
		try{
			return ResetPasswordToken.findOne({token});
		}catch(err){
			logger.info(err);
		}
	}

	async findOneTokenByUser(userId){
		try{
			return ResetPasswordToken.findOne({user_id: userId});
		}catch(err){
			logger.info(err);
		}
	}

	async deleteOneToken(){
		try {
			return await ResetPasswordToken.destroy();
		} catch (err) {
			logger.info(err);
		}
	}
}

module.exports = ResetPasswordTokenDAO;