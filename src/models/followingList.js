const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const FollowingList = sequelize.define('FollowingList',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, {
	underscored: true,
	timestamps:false
});


module.exports = FollowingList;