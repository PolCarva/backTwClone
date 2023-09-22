const { mentionTitle, mentionMessage } = require('./notificationsMessages');
const UsersApi = require('../services/users');
const usersApi = new UsersApi();
const NotificationsApi = require('../services/notifications');
const notificationsApi = new NotificationsApi();

async function mention(text, userId, userUsername, postId){
	const words = text.split(/\s+/);
	const usersMentioned = [];
	for (let i = 0; i < words.length; i++) {
		if(words[i][0] === '@'){
			const user = await usersApi.getUserByUsername((words[i]));
			if(user && user.dataValues.id !== userId && !usersMentioned.includes(user.dataValues.id)){
				await notificationsApi.createNotification(mentionTitle(), mentionMessage(userUsername, 'post'), user.dataValues.id, 'mention', null, null, postId);
				usersMentioned.push(user.dataValues.id);
			}  
		}
	}
}

module.exports = mention;