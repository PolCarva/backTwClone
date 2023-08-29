const Like = require('../models/like');
const Post = require('../models/post');
const PostComment = require('../models/postComment');
const User = require('../models/user');
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
				},include: [
					{
						model: User,
						attributes: ['full_name', 'username', 'profile_photo'] 
					},{
						model: Like,
						attributes: ['id'] 
					}, {
						model: PostComment,
						attributes: ['comment'],
						include:[
							{
								model: User,
								attributes: ['full_name', 'username', 'profile_photo']
							}, {
								model: Like,
								attributes: ['id']
							}
						]
					}
				],
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
				},include: [
					{
						model: User,
						attributes: ['full_name', 'username', 'profile_photo'] 
					},{
						model: Like,
						attributes: ['id'] 
					}, {
						model: PostComment,
						attributes: ['comment'],
						include:[
							{
								model: User,
								attributes: ['full_name', 'username', 'profile_photo']
							}, {
								model: Like,
								attributes: ['id']
							}
						]
					}
				],
				order: [
					['created_at', 'DESC']
				]
			});
		}catch(err){
			logger.info(err);
		}
	}

	async getPost(postId){
		try{
			return await Post.findByPk(postId, {
				include: [
					{
						model: User,
						attributes: ['full_name', 'username', 'profile_photo'] 
					},{
						model: Like,
						include: [
							{
								model: User,
								attributes: ['full_name', 'username','profile_photo']
							}
						] 
					}, {
						model: PostComment,
						attributes: ['comment'],
						include:[
							{
								model: User,
								attributes: ['full_name', 'username', 'profile_photo']
							}, {
								model: Like,
								attributes: ['id']
							}
						]
					}
				]
			});
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = PostsDAO;