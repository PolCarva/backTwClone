const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const User = require('./user');
const Chat = require('./chat');

const Chat_User = sequelize.define('Chat_User', {
	id:{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, { 
	underscored: true,
	timestamps: false 
});

User.belongsToMany(Chat, { through: Chat_User, foreignKey: 'user_id' });
Chat.belongsToMany(User, { through: Chat_User, foreignKey: 'chat_id' });

module.exports = Chat_User;