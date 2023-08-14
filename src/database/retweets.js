const Retweet = require('../models/retweet');
const logger = require('../utils/logger');
const {Op} = require('sequelize');

class RetweetsDAO{

	async retweet(retweet){
		try{
			return await Retweet.create(retweet);
		}catch(err){
			logger.info(err);
		}
	}

	async getHomeRetweets(following){
		try{
			return await Retweet.findAll({
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

	async getUserRetweets(userId){
		try{
			return await Retweet.findAll({
				where:{
					user_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	}

	async getRetweet(retweetId){
		try{
			return await Retweet.findByPk(retweetId);
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = RetweetsDAO;