const { Op, Sequelize } = require('sequelize');
const ChatUser = require('../models/chat_user');
const logger = require('../utils/logger');
const Chat = require('../models/chat');

class ChatsUsersDAO{

	async createChatUser(user1Id, user2Id){
		try {
			const chatExists = await ChatUser.findOne({
				attributes: ['chat_id'],
				where: {
					[Op.or]:[
						{
							user_id: user1Id,
						},
						{
							user_id: user2Id,
						},
					],
				},
				group: ['chat_id'],
				having: Sequelize.literal('count(*) = 2')
			});
			if(chatExists !== null){
				return chatExists.dataValues.chat_id;
			}else{
				const chat = await Chat.create();
				const chat1 = await ChatUser.create({chat_id: chat.dataValues.id, user_id: user1Id });
				const chat2 = await ChatUser.create({chat_id: chat.dataValues.id, user_id: user2Id });
				return [chat1, chat2];
			}
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