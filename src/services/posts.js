const PostsDAO = require('../database/posts');
const UsersDAO = require('../database/users');
const UsersFollowingListsDAO = require('../database/users_followingLists');
const NotificationsApi = require('../services/notifications');
const PostCommentsApi = require('./postComments');
const {uploadFile} = require('../utils/awsS3');
const mention = require('../utils/mentions');
const transformUserMention = require('../utils/transformUserMention');

class PostsApi{
	constructor(){
		this.postsDAO = new PostsDAO();
		this.usersFollowingListsDAO = new UsersFollowingListsDAO();
		this.usersDAO = new UsersDAO();
		this.notificationsApi = new NotificationsApi();
		this.postCommentsApi = new PostCommentsApi();
	}
    
	async createPost(postFile, fileName, userId, text, userUsername, fileUrl){
		if(postFile && fileName && fileUrl){
			await uploadFile(postFile, fileName);
		}
		
		if(text.includes('@')){
			let wordsWithArroba = text.match(/\B@\S+/g);
			const transformedText = transformUserMention(wordsWithArroba, text);
			const post = await this.postsDAO.createPost({user_id: userId, text, file: fileUrl });
			await mention(transformedText, userId, userUsername, post.dataValues.id);
		}else{
			return await this.postsDAO.createPost({user_id: userId, text, file: fileUrl });
		}
	}    

	async getHomePosts(userId){
		const userFollowingList = await this.usersFollowingListsDAO.getUserFollowingList(userId);
		const followingListUsersIds = userFollowingList.map(list => list.dataValues.users_ids);

		return await this.postsDAO.getHomePosts(followingListUsersIds, userId);
	}

	async deletePost(postId, userId){
		await this.notificationsApi.deleteNotification('mention', postId);
		await this.postCommentsApi.deleteAllCommentsfromPost(postId);
		return await this.postsDAO.deletePost(postId, userId);
	}

	async getPost(postId){
		return await this.postsDAO.getPost(postId);
	}
}

module.exports = PostsApi;