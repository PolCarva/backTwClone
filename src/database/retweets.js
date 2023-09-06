const Retweet = require('../models/retweet');
const logger = require('../utils/logger');
const {Op} = require('sequelize');
const IncludeOptions = require('./includeOptions');

class RetweetsDAO{
	constructor(){
		this.includeOptions = new IncludeOptions();
	}

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
				},include: this.includeOptions.getRetweetedPostIncludeOption(),
				order: [
					['created_at', 'DESC']
				]}
			);
		}catch(err){
			logger.info(err);
		}
	}

	async getRetweet(retweetId){
		try{
			return await Retweet.findByPk(retweetId, {
				include: this.includeOptions.getRetweetedPostIncludeOption()
			});
		}catch(err){
			logger.info(err);
		}
	}

	async deleteRetweet(retweetId, userId){
		try{
			return await Retweet.destroy({
				where: {
					id: retweetId,
					user_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = RetweetsDAO;