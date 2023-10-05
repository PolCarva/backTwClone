const asyncHandler = require('express-async-handler');
const ChatsApi = require('../services/chats');

class ChatsController{
	constructor(){
		this.chatsApi = new ChatsApi();
	}

	createChat = asyncHandler(async(req, res) => {
		try {
			const chat = await this.chatsApi.createChat(req.user.id, req.params.userid);
			res.json({success: true, message: 'chat creado', chatId: chat[0].dataValues.chat_id}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});  

	getMyChats = asyncHandler(async(req, res) => {
		try {
			const chats = await this.chatsApi.getMyChats(req.user.id);
			res.json({success: true, data: chats}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	}); 

}

module.exports = ChatsController;