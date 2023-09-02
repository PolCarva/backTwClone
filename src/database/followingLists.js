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


	async addUserToOrRemoveUserFromFollowingList(myUserId, targetUserId){
		try {
			const userFollowingList = await FollowingList.findOne({
				where:{
					user_id: myUserId
				}
			});

			const isTargetUserInFollowingList = await UserFollowingList.findOne({
				where: {
					following_lists_id: userFollowingList.dataValues.id,
					users_ids: targetUserId
				}
			}); 
			console.log(isTargetUserInFollowingList);

			if(isTargetUserInFollowingList !== null){
				return await isTargetUserInFollowingList.destroy();
			}else{
				return await UserFollowingList.create({users_ids: targetUserId, following_lists_id: myUserId});
			}   
		} catch (err) {
			logger.info(err);
			throw new Error(err);
		}
	}
}

module.exports = FollowingListDAO;