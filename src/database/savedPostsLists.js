const SavedPostsList = require('../models/savedPostsList');
const logger = require('../utils/logger');
const Post = require('../models/post');
const IncludeOptions = require('./includeOptions');
const User = require('../models/user');

class SavedPostsListsDAO{
	constructor(){
		this.includeOptions = new IncludeOptions;
	}

	async createSavedPostsList(userId){
		try{
			return await SavedPostsList.create({user_id: userId});
		}catch(err){
			logger.info(err);
		}
	}

	async getSavedPostsList(userId){
		try {
			return await SavedPostsList.findAll({ 
				where: { id: userId },
				include: [
					{
						model: Post,
						attributes: ['id', 'text', 'file', 'created_at', 'user_id'],
						include:[
							{
								model: User,
								attributes: ['full_name', 'username']
							}
						]
					}
				]
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