const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Retweet = sequelize.define('Retweet',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	retweeted_at:{
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	}
}, {
	underscored: true,
	timestamps: false
});


module.exports = Retweet;