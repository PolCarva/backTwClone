const User_FollowersList = require('../models/user_followersList');
const logger = require('../utils/logger');

class UserFollowersListDAO{

	async getUserFollowersList(userId){
		try{
			return await User_FollowersList.findAll({
				where:{
					follower_list_id: userId
				}
			});
		}catch(err){
			logger.info(err);
		}
	}

}

module.exports = UserFollowersListDAO;