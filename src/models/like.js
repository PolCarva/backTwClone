const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Like = sequelize.define('Like',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	remove_like:{
		type: DataTypes.BOOLEAN,
		defaultValue: true
	}
}, {
	underscored: true
});


module.exports = Like;