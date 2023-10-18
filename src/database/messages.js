const { Op } = require('sequelize');
const Message = require('../models/message');
const logger = require('../utils/logger');


class MessagesDAO{

	async createMessage(message, userId, chatId){
		try{
			return await Message.create({message, user_id: userId, chat_id: chatId});
		}catch(err){
			logger.info(err);
		}
	}

	async getMessagesInChat(chatId){
		try {
			return await Message.findAll({
				where: {
					chat_id: chatId
				}
			});
		} catch (err) {
			logger.info(err);
		}
	}

	/* async deleteMessage(){
		try {
            return 
		} catch (err) {
			logger.info(err);
		}
	} */

	async readMessage(userId, chatId){
		try{
			return await Message.update(
				{ readed: true },
				{
					where: {
						user_id: { [Op.not]: userId },
						chat_id: chatId,
						readed: false
					}
				}
			);
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = MessagesDAO;