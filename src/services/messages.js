const MessagesDAO = require('../database/messages');

class MessagesApi{
	constructor(){
		this.messagesDAO = new MessagesDAO();
	}
    
	async createMessage(message, userId, chatId){
		return await this.messagesDAO.createMessage(message, userId, chatId);
	}    

	async getMessagesInChat(chatId){
		return await this.messagesDAO.getMessagesInChat(chatId);
	}

	async readMessage(userId, chatId){
		return await this.messagesDAO.readMessage(userId, chatId);
	}

}

module.exports = MessagesApi;