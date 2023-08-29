const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const FollowersList = require('./followersList');
const User = require('./user');

const User_FollowersList = sequelize.define('user_followers_list', {
	id:{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, { 
	timestamps: false 
});

FollowersList.belongsToMany(User, { through: User_FollowersList, foreignKey: 'user_id', as: 'Followers'  } );
User.belongsToMany(FollowersList, { through: User_FollowersList, foreignKey: 'follower_list_id', as: 'Followers' });

module.exports = User_FollowersList;