const PostsDAO = require('../database/posts');
const UsersFollowingListsDAO = require('../database/users_followingLists');
const {uploadFile, readFile} = require('../utils/awsS3');

class PostsApi{
	constructor(){
		this.postsDAO = new PostsDAO();
		this.usersFollowingListsDAO = new UsersFollowingListsDAO();
	}
    
	async createPost(/* postFile,  */userId, text/* , file */){
		//await uploadFile(postFile, `user${userId}`);
		return await this.postsDAO.createPost({user_id: userId, text});
	}    

	async getHomePosts(userId){
		const userFollowingList = await this.usersFollowingListsDAO.getUserFollowingList(userId);
		const followingListUsersIds = userFollowingList.map(list => list.dataValues.users_ids);

		return await this.postsDAO.getHomePosts(followingListUsersIds);
	}

	async deletePost(postId){
		return await this.postsDAO.deletePost(postId);
	}

	async getUserPosts(userId){
		return await this.postsDAO.getUserPosts(userId);
	}

	async getPost(postId){
		return await this.postsDAO.getPost(postId);
	}
}

module.exports = PostsApi;