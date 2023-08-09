const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const SavedPostsList = sequelize.define('SavedPostsList',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, {
	underscored: true,
	timestamps: false
});


module.exports = SavedPostsList;