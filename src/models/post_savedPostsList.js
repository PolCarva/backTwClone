const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const SavedPostsList = require('./savedPostsList');
const Post = require('./post');

const Post_SavedPostsList = sequelize.define('Post_SavedPostsList', {
	id:{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, { 
	underscored: true,
	timestamps: false 
});

SavedPostsList.belongsToMany(Post, { through: Post_SavedPostsList, foreignKey: 'post_id' } );
Post.belongsToMany(SavedPostsList, { through: Post_SavedPostsList, foreignKey: 'saved_posts_list_id' });

module.exports = Post_SavedPostsList;