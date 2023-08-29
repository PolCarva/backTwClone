const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const User = require('./user');
const FollowingList = require('./followingList');

const User_FollowingList = sequelize.define('user_following_list', {
	id:{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, { 
	timestamps: false 
});

FollowingList.belongsToMany(User, { through: User_FollowingList, foreignKey: 'users_ids', as: 'Following'  } );
User.belongsToMany(FollowingList, { through: User_FollowingList, foreignKey: 'following_lists_id', as: 'Following' });

module.exports = User_FollowingList;