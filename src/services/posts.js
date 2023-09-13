const PostsDAO = require('../database/posts');
const UsersDAO = require('../database/users');
const UsersFollowingListsDAO = require('../database/users_followingLists');
const NotificationsDAO = require('../database/notifications');
const {uploadFile, readFile} = require('../utils/awsS3');
const mention = require('../utils/mentions');

class PostsApi{
	constructor(){
		this.postsDAO = new PostsDAO();
		this.usersFollowingListsDAO = new UsersFollowingListsDAO();
		this.usersDAO = new UsersDAO();
		this.notificationsDAO = new NotificationsDAO();
	}
    
	async createPost(/* postFile,  */userId, text, userUsername/* , file */){
		//await uploadFile(postFile, `user${userId}`);

		if(text){
			await mention(text, userId, userUsername);
		}
		return await this.postsDAO.createPost({user_id: userId, text});
	}    

	async getHomePosts(userId){
		const userFollowingList = await this.usersFollowingListsDAO.getUserFollowingList(userId);
		const followingListUsersIds = userFollowingList.map(list => list.dataValues.users_ids);

		return await this.postsDAO.getHomePosts(followingListUsersIds, userId);
	}

	async deletePost(postId, userId){
		return await this.postsDAO.deletePost(postId, userId);
	}

	async getPost(postId){
		return await this.postsDAO.getPost(postId);
	}
}

module.exports = PostsApi;