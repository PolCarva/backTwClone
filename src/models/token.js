const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Token = sequelize.define('Token',{
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



module.exports = Token;