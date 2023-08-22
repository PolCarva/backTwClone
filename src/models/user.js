const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const FollowersList = require('./followersList');
const FollowingList = require('./followingList');
const PostComment = require('./postComment');
const Post = require('./post');
const Like = require('./like');
const Retweet = require('./retweet');
const CommentReply = require('./commentReply');
const Token = require('./token');
const Notification = require('./notification');
const SavedPostsList = require('./savedPostsList');

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
	},
	activated:{
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	profile_photo: DataTypes.STRING
}, {
	underscored: true
});

User.beforeCreate(async (user) => {
	user.username = '@' + user.username;
});

User.hasOne(FollowersList, { foreignKey: 'user_id', sourceKey: 'id' });
FollowersList.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasOne(FollowingList, { foreignKey: 'user_id', sourceKey: 'id' });
FollowingList.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasOne(SavedPostsList, { foreignKey: 'user_id', sourceKey: 'id' });
SavedPostsList.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasMany(PostComment, { foreignKey: 'user_id', sourceKey: 'id' });
PostComment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasMany(Post, { foreignKey: 'user_id', sourceKey: 'id' });
Post.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasMany(Notification, { foreignKey: 'user_id', sourceKey: 'id' });
Notification.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

Post.hasMany(PostComment, { foreignKey: 'post_id', sourceKey: 'id' });
PostComment.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id'});

Post.hasMany(Retweet, { foreignKey: 'post_id', sourceKey: 'id' });
Retweet.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id'});

User.hasMany(Retweet, { foreignKey: 'user_id', sourceKey: 'id' });
Retweet.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

User.hasMany(Like, { foreignKey: 'user_id', sourceKey: 'id' });
Like.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id'});

Post.hasMany(Like, { foreignKey: 'post_id', sourceKey: 'id' });
Like.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id'}); 

PostComment.hasMany(Like, { foreignKey: 'post_comment_id', sourceKey: 'id' });
Like.belongsTo(PostComment, { foreignKey: 'post_comment_id', targetKey: 'id'}); 

CommentReply.hasMany(Like, { foreignKey: 'comment_reply_id', sourceKey: 'id' });
Like.belongsTo(CommentReply, { foreignKey: 'comment_reply_id', targetKey: 'id'}); 

PostComment.hasMany(CommentReply, { foreignKey: 'comment_id', sourceKey: 'id' });
CommentReply.belongsTo(PostComment, { foreignKey: 'comment_id', sourceKey: 'id' });

User.hasOne(Token, {foreignKey: 'user_id', sourceKey: 'id'});
Token.belongsTo(User, {foreignKey: 'user_id', sourceKey: 'id'});

module.exports = User;