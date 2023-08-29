const Chat = require('../models/chat');
const logger = require('../utils/logger');

class ChatsDAO{

	async createChat(){
		try {
			return await Chat.create();
		} catch (err) {
			logger.info(err);
		}
	}
	/* 
	async getChat(chatId){
		try{
			return await Chat.findByPk(chatId);
		}catch(err){
			logger.info(err);
		}
	}

	async getMyChats(userId){
		try {
			return await Chat.findAll({
				where:{
					user_id: userId
				}
			});
		} catch (err) {
			logger.info(err);
		}
	} */

}

module.exports = ChatsDAO;