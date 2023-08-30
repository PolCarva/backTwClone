const FollowersList = require('../models/followersList');
const UserFollowersList = require('../models/user_followersList');
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
			return await UserFollowersList.findAll({ 
				where: { follower_list_id: userId } 
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
			return await userFollowersList.addFollower(followerId);
		} catch (err) {
			logger.info(err);
		}
	}
}

module.exports = FollowersListDAO;