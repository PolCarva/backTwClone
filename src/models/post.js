const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Post = sequelize.define('Post',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	text:{
		type: DataTypes.STRING
	},
	file:{
		type: DataTypes.STRING
	}
}, {
	underscored: true
});



module.exports = Post;