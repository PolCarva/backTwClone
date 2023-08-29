const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Message = sequelize.define('Message',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	message:{
		type: DataTypes.TEXT,
		allowNull: false
	},
	readed:{
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
}, {
	underscored: true
});

module.exports = Message;