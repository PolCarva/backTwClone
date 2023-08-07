const Token = require('../models/token');
const logger = require('../utils/logger');

class TokenDAO{

	async findOneTokenByToken(token){
		try{
			return Token.findOne({token});
		}catch(err){
			logger.info(err);
		}
	}

	async findOneTokenByUser(userId){
		try{
			return Token.findOne({user_id: userId});
		}catch(err){
			logger.info(err);
		}
	}

	async deleteOneToken(){
		try {
			return await Token.destroy();
		} catch (err) {
			logger.info(err);
		}
	}
}

module.exports = TokenDAO;