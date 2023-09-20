const { Op } = require('sequelize');
const ChatUser = require('../models/chat_user');
const logger = require('../utils/logger');

class ChatsUsersDAO{

	async createChatUser(user1Id, user2Id, chatId){
		try {
			const chat1 = await ChatUser.create({chat_id: chatId, user_id: user1Id });
			const chat2 = await ChatUser.create({chat_id: chatId, user_id: user2Id });
			return [chat1, chat2];
		} catch (err) {
			logger.info(err);
			throw err;
		}
	} 

	async getWithWhoIAmChatting(userId){
		try {
			const chatIds = await ChatUser.findAll({
				attributes: ['chat_id'],
				where: {
					user_id: userId
				}
			});

			const withWhoIAmChatting = await ChatUser.findAll({
				attributes: ['user_id'],
				where: {
					chat_id: {
						[Op.in]: chatIds.map(chat => chat.chat_id)
					},
					user_id: {
						[Op.ne]: userId
					}
				}
			});

			return [withWhoIAmChatting.map(chat => chat.user_id), chatIds.map(chat => chat.dataValues.chat_id)];
		} catch (err) {
			logger.info(err);
			throw new Error(err.message);
		}
	}

}

module.exports = ChatsUsersDAO;