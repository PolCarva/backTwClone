const SavedPostsListsDAO = require('../database/savedPostsLists');

class SavedPostsListsApi{
	constructor(){
		this.savedPostsListsDAO = new SavedPostsListsDAO();
	}
    
	async getSavedPostsList(userId){
		return await this.savedPostsListsDAO.getSavedPostsList(userId);
	}

	async addPostToSavedPostsList(postId, userId){
		return await this.savedPostsListsDAO.addPostToSavedPostsList(postId, userId);
	}

	async removePostFromSavedPostsList(userId, postId){
		return await this.savedPostsListsDAO.removePostFromSavedPostsList(userId, postId);
	}
}

module.exports = SavedPostsListsApi;