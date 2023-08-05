const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const ResetPasswordToken = sequelize.define('ResetPasswordToken',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	token:{
		type: DataTypes.TEXT,
	}
}, {
	underscored: true
});



module.exports = ResetPasswordToken;