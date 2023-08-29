const asyncHandler = require('express-async-handler');
const messagesApi = require('../services/messages');

class messagesController{
	constructor(){
		this.messagesApi = new messagesApi();
	}

	createMessage = asyncHandler(async(req, res) => {
		try {
			await this.messagesApi.createMessage(req.body.message, req.user.id, req.params.chatid);
			res.json({success: true, message: 'mensaje enviado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});  

	getMessagesInChat = asyncHandler(async(req, res) => {
		try {
			const messages = await this.messagesApi.getMessagesInChat(req.params.chatid);
			res.json({success: true, data: messages}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	}); 

}

module.exports = messagesController;