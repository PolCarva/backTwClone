const PostsDAO = require('../database/posts');
const UsersFollowingListsDAO = require('../database/users_followingLists');

class PostsApi{
	constructor(){
		this.postsDAO = new PostsDAO();
		this.usersFollowingListsDAO = new UsersFollowingListsDAO();
	}
    
	async createPost(userId, text){
		return await this.postsDAO.createPost({user_id: userId, text});
	}    

	async getPosts(userId){
		const userFollowingList = await this.usersFollowingListsDAO.getUserFollowingList(userId);
		const followingListUsersIds = userFollowingList.map(list => list.dataValues.users_ids);

		return await this.postsDAO.getPosts(followingListUsersIds);
	}

	async deletePost(postId){
		return await this.postsDAO.deletePost(postId);
	}

	async getMyPosts(userId){
		return await this.postsDAO.getMyPosts(userId);
	}

	async getUserPosts(userId){
		return await this.postsDAO.getUserPosts(userId);
	}

	async getPost(postId){
		return await this.postsDAO.getPost(postId);
	}
}

module.exports = PostsApi;