const FollowersList = require('../models/followersList');
const logger = require('../utils/logger');

class FollowersListDAO{

	async createFollowersList(userId){
		try{
			return await FollowersList.create({user_id: userId});
		}catch(err){
			logger.info(err);
		}
	}

	async getFollowersList(userId){
		try {
			return await FollowersList.findOne({ 
				where: { user_id: userId } 
			});
		} catch (err) {
			logger.info(err);
		}
	}

	async addUserToFollowersList(userId, followerId){
		try {
			const userFollowersList = await FollowersList.findOne({
				where:{
					user_id: userId
				}
			});
			return await userFollowersList.addUser(followerId);
		} catch (err) {
			logger.info(err);
		}
	}
}

module.exports = FollowersListDAO;