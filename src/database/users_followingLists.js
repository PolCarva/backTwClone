const User_FollowingList = require('../models/user_followingList');
const logger = require('../utils/logger');

class UsersFollowingListsDAO{

	async getUserFollowingList(userId){
		try{
			return await User_FollowingList.findAll({
				where:{
					following_lists_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = UsersFollowingListsDAO;