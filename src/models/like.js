const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Like = sequelize.define('Like',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, {
	underscored: true,
	timestamps:false
});


module.exports = Like;