const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const FollowersList = require('./followersList');
const FollowingList = require('./followingList');
const PostComment = require('./postComment');
const Post = require('./post');
const Like = require('./like');
const CommentReply = require('./commentReply');

const User = sequelize.define('User',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	full_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password:{
		type: DataTypes.STRING,
		allowNull: false
	},
	email:{
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	underscored: true,
	timestamps: false
});

User.hasOne(FollowersList, { foreignKey: 'user_id', sourceKey: 'id' });
FollowersList.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasOne(FollowingList, { foreignKey: 'user_id', sourceKey: 'id' });
FollowingList.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasMany(PostComment, { foreignKey: 'user_id', sourceKey: 'id' });
PostComment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasMany(Post, { foreignKey: 'user_id', sourceKey: 'id' });
Post.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

Post.hasMany(PostComment, { foreignKey: 'post_id', sourceKey: 'id' });
PostComment.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id'});

/* User.hasMany(Like, { foreignKey: 'user_id', sourceKey: 'id' });
Like.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

Post.hasMany(Like, { foreignKey: 'post_id', sourceKey: 'id' });
Like.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id'}); */

/* PostComment.hasMany(CommentReply, { foreignKey: 'comment_id', sourceKey: 'id' });
CommentReply.hasMany(PostComment, { foreignKey: 'comment_id', sourceKey: 'id' }); */

module.exports = User;