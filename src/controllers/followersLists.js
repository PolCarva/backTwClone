const asyncHandler = require('express-async-handler');
const FollowersListsApi = require('../services/followersLists');

class FollowersListsController{
	constructor(){
		this.followersListsApi = new FollowersListsApi();
	}

	getFollowersList = asyncHandler(async(req, res) => {
		try {
			const followersList = await this.followersListsApi.getFollowersList(req.params.userid);
			res.json({success: true, data: followersList}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

}

module.exports = FollowersListsController;