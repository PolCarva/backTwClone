const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Notification = sequelize.define('Notification',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title:{
		type: DataTypes.TEXT,
		allowNull: false
	},
	message:{
		type: DataTypes.TEXT,
		allowNull: false
	},
	notification_type:{
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

module.exports = Notification;