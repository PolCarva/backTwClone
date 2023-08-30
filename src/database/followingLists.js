const FollowingList = require('../models/followingList');
const UserFollowingList = require('../models/user_followingList');
const logger = require('../utils/logger');

class FollowingListDAO{

	async createFollowingList(userId){
		try{
			return await FollowingList.create({user_id: userId});
		}catch(err){
			logger.info(err);
		}
	}

	async getFollowingList(userId){
		try {
			return await UserFollowingList.findAll({ 
				where: { following_lists_id: userId } 
			});
		} catch (err) {
			logger.info(err);
		}
	}

	async addUserToFollowingList(myUserId, targetUserId){
		try {
			const userFollowingList = await FollowingList.findOne({
				where:{
					user_id: myUserId
				}
			});
			return await userFollowingList.addFollowing(targetUserId);
		} catch (err) {
			logger.info(err);
		}
	}
}

module.exports = FollowingListDAO;