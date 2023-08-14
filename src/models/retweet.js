const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Retweet = sequelize.define('Retweet',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, {
	underscored: true
});


module.exports = Retweet;