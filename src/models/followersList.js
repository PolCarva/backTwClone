const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const FollowersList = sequelize.define('FollowersList',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, {
	underscored: true,
	timestamps: false
});


module.exports = FollowersList;