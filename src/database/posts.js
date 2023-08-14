const Post = require('../models/post');
const logger = require('../utils/logger');
const {Op} = require('sequelize');

class PostsDAO{

	async createPost(newPost){
		try{
			return await Post.create(newPost);
		}catch(err){
			logger.info(err);
		}
	}

	async getHomePosts(following){
		try{
			return await Post.findAll({
				where:{
					user_id:{
						[Op.in]: following
					}
				},
				order: [
					['created_at', 'DESC']
				]}
			);
		}catch(err){
			logger.info(err);
		}
	}

	/* 	async deletePost(postId){
		try{
			return await Post.destroy({
				where:{
					id: postId
				}
			});
		}catch(err){
			logger.info(err);
		}
	} */

	async getUserPosts(userId){
		try{
			return await Post.findAll({
				where:{
					user_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	}

	async getPost(postId){
		try{
			return await Post.findByPk(postId);
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = PostsDAO;