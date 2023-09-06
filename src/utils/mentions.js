const { mentionTitle, mentionMessage } = require('./notificationsMessages');
const UsersDAO = require('../database/users');
const usersDAO = new UsersDAO();
const NotificationsDAO = require('../database/notifications');
const notificationsDAO = new NotificationsDAO();

async function mention(text, userId, userUsername){
	const words = text.split(' ');
	const usersMentioned = [];
	for (let i = 0; i < words.length; i++) {
		if(words[i][0] === '@'){
			const user = await usersDAO.getUserByUsername(words[i]);
			if(user && user.dataValues.id !== userId && !usersMentioned.includes(user.dataValues.id)){
				await notificationsDAO.createNotification(mentionTitle(), mentionMessage(userUsername, 'post'), user.dataValues.id, 'mention');
				usersMentioned.push(user.dataValues.id);
			}
		}
	}
}

module.exports = mention;