const ChatsDAO = require('../database/chats');
const ChatsUsersDAO = require('../database/chats_users');
const UsersApi = require('../services/users');

class ChatsApi{
	constructor(){
		this.chatsDAO = new ChatsDAO();
		this.chatsUsersDAO = new ChatsUsersDAO();
		this.usersApi = new UsersApi();
	}

	async createChat(user1Id, user2Id){
		const chat = await this.chatsDAO.createChat();
		return await this.chatsUsersDAO.createChatUser(user1Id, user2Id, chat.dataValues.id);
	}

	async getMyChats(userId){
		const withWhoIAmChattingId = await this.chatsUsersDAO.getWithWhoIAmChatting(userId);
		const withWhoIAmChattingUser = await this.usersApi.getUsersById(withWhoIAmChattingId[0]);

		return withWhoIAmChattingUser.map(({id, profile_photo, username, full_name}) => ({id, profile_photo, username, full_name, chat_id: withWhoIAmChattingId[1][withWhoIAmChattingUser.findIndex(user => user.id === id)]}));
	}

}
module.exports = ChatsApi;