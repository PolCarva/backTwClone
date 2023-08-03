const asyncHandler = require('express-async-handler');
const FollowingListsApi = require('../services/followingLists');
const FollowersListsApi = require('../services/followersLists');

class FollowingListsController{
	constructor(){
		this.followingListsApi = new FollowingListsApi();
		this.followersListsApi = new FollowersListsApi();
	}

	getFollowingList = asyncHandler(async(req, res) => {
		try {
			const followingList = await this.followingListsApi.getFollowingList(req.params.userid);
			res.json({success: true, data: followingList}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	addUserToFollowingList = asyncHandler(async(req, res) => {
		try {
			await this.followingListsApi.addUserToFollowingList(req.params.userid, req.user.id);
			await this.followersListsApi.addUserToFollowersList(req.user.id, req.params.userid);
			res.json({success: true, message: `usuario ${req.params.userid} agregado a la lista de seguidos de ${req.user.id}`}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});  

}

module.exports = FollowingListsController;