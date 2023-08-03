const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const CommentReply = sequelize.define('CommentReply',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	reply:{
		type: DataTypes.TEXT,
	}
}, {
	underscored: true
});

module.exports = CommentReply;