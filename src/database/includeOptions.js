const Like = require('../models/like');
const Post = require('../models/post');
const PostComment = require('../models/postComment');
const Retweet = require('../models/retweet');
const User = require('../models/user');
const FollowersList = require('../models/followersList');
const FollowingList = require('../models/followingList');
const SavedPostsList = require('../models/savedPostsList');

class IncludeOptions{

	getUserIncludeOptions() {
		return [
			this.getPostIncludeOption(),
			this.getRetweetIncludeOption(),
			this.getFollowersListIncludeOption(),
			this.getFollowingListIncludeOption(),
			this.getSavedPostsListIncludeOption()
		];
	}

	getPostIncludeOptions(){
		return [
			this.getUserIncludeOption(),
			{ model: Like, attributes: ['id', 'user_id'] },
			this.getPostCommentIncludeOption(),
			this.getRetweetIncludeOption(),
			{model: SavedPostsList}
		];
	}

	getPostIncludeOption() {
		return {
			model: Post,
			attributes: ['id', 'text', 'file', 'created_at'],
			include: [
				this.getUserIncludeOption(),
				{ model: Like, attributes: ['id', 'user_id'] },
				this.getPostCommentIncludeOption(),
				this.getRetweetIncludeOption()
			],
		};
	}
      
	getPostCommentIncludeOption() {
		return {
			model: PostComment,
			attributes: ['id', 'comment'],
			include: [this.getUserIncludeOption(), { model: Like, attributes: ['id', 'user_id'] }],
		};
	}
      
	getUserIncludeOption() {
		return {
			model: User,
			attributes: ['id', 'full_name', 'username', 'profile_photo'],
		};
	}
      
	getRetweetIncludeOption() {
		return {
			model: Retweet,
			attributes: ['id', 'retweeted_at'],
			include: [
				this.getRetweetedPostIncludeOption()
			],
		};
	}

	getRetweetedPostIncludeOption() {
		return {
			model: Post,
			attributes: ['id', 'text', 'file'],
			include: [
				this.getUserIncludeOption(),
				{model: Retweet, attributes: ['id', 'user_id', 'retweeted_at']},
				{ model: Like, attributes: ['id', 'user_id'] },
				this.getPostCommentIncludeOption(),
			]
		}
		;
	}

	getSavedPostsListIncludeOption(){
		return {
			model: SavedPostsList,
			include:[
				this.getPostIncludeOption()
			]
		};
	}

	getFollowersListIncludeOption() {
		return {
			model: FollowersList,
			include: [
				{ model: User, as: 'Follower', attributes: ['id', 'full_name', 'username', 'profile_photo'] },
			],
		};
	}
      
	getFollowingListIncludeOption() {
		return {
			model: FollowingList,
			include: [
				{ model: User, as: 'Following', attributes: ['id', 'full_name', 'username', 'profile_photo'] },
			],
		};
	}

}

module.exports = IncludeOptions;