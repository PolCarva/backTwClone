const Post = require('../models/post');
const logger = require('../utils/logger');
const {Op} = require('sequelize');
const IncludeOptions = require('./includeOptions');

class PostsDAO{
	constructor(){
		this.includeOptions = new IncludeOptions;
	}

	async createPost(newPost){
		try{
			return await Post.create(newPost);
		}catch(err){
			logger.info(err);
		}
	}

	async getHomePosts(following, userId){
		try{
			return await Post.findAll({
				where:{
					[Op.or]: [
						{
							user_id:{
								[Op.in]: following
							}
						}, 
						{
							user_id: userId 
						}						
					]					
				},include: this.includeOptions.getPostIncludeOptions()
			});
		}catch(err){
			logger.info(err);
		}
	}

	async deletePost(postId, userId){
		try{
			return await Post.destroy({
				where:{
					id: postId,
					user_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	} 

	async getPost(postId){
		try{
			return await Post.findByPk(postId, {
				include: this.includeOptions.getPostIncludeOptions()
			});
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = PostsDAO;