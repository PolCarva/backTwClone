const SavedPostsList = require('../models/savedPostsList');
const PostSavedPostsList = require('../models/post_savedPostsList');
const logger = require('../utils/logger');
const Post = require('../models/post');

class SavedPostsListsDAO{

	async createSavedPostsList(userId){
		try{
			return await SavedPostsList.create({user_id: userId});
		}catch(err){
			logger.info(err);
		}
	}

	async getSavedPostsList(userId){
		try {
			return await PostSavedPostsList.findAll({ 
				where: { saved_posts_list_id: userId }/* ,
				include: {
					model: Post,
					through: {
						attributes: [] 
					}
				} */
			});
		} catch (err) {
			logger.info(err);
		}
	}

	async addPostToSavedPostsList(userId, postId){
		try {
			const savedPostsList = await SavedPostsList.findOne({
				where:{
					user_id: userId
				}
			});
			return await savedPostsList.addPost(postId);
		} catch (err) {
			logger.info(err);
		}
	}

	async removePostFromSavedPostsList(userId, postId){
		try {
			const savedPostsList = await SavedPostsList.findOne({
				where:{
					user_id: userId
				}
			});
			return await savedPostsList.removePost(postId);
		} catch (err) {
			logger.info(err);
		}
	}
}

module.exports = SavedPostsListsDAO;