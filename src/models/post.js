const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Post = sequelize.define('Post',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	text:{
		type: DataTypes.TEXT,
	}
}, {
	underscored: true
});



module.exports = Post;