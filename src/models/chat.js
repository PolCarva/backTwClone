const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Chat = sequelize.define('Chat',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, {
	underscored: true
});

module.exports = Chat;