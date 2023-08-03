const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const PostComment = sequelize.define('PostComment',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	comment:{
		type: DataTypes.TEXT,
	}
}, {
	underscored: true
});

module.exports = PostComment;