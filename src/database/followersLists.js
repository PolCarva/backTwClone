const FollowersList = require('../models/followersList');
const User_FollowersList = require('../models/user_followersList');
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

	async addUserToOrRemoveUserFromFollowersList(userId, followerId){
		try {
			const userFollowersList = await FollowersList.findOne({
				where:{
					user_id: userId
				}
			});

			const isFollowerInFollowersList = await UserFollowersList.findOne({
				where: {
					follower_list_id: userFollowersList.dataValues.id,
					user_id: followerId
				}
			});
			
			if(isFollowerInFollowersList !== null){
				return await isFollowerInFollowersList.destroy();
			}else{
				return await UserFollowersList.create({user_id: followerId, follower_list_id: userId});
			}  
		} catch (err) {
			logger.info(err);
		}
	}
}

module.exports = FollowersListDAO;