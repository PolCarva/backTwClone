const asyncHandler = require('express-async-handler');
const ChatsApi = require('../services/chats');

class ChatsController{
	constructor(){
		this.chatsApi = new ChatsApi();
	}

	createChat = asyncHandler(async(req, res) => {
		try {
			const chat = await this.chatsApi.createChat(req.user.id, req.params.userid);
			console.log(chat);
			res.json({success: true, message: 'ir al chat', chatId: chat[0] ? chat[0].dataValues.chat_id : chat}).status(200);
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