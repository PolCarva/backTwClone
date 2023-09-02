const asyncHandler = require('express-async-handler');
const FollowingListsApi = require('../services/followingLists');
const FollowersListsApi = require('../services/followersLists');
const NotificationsApi = require('../services/notifications');
const { newFollowerTitle, newFollowerMessage } = require('../utils/notificationsMessages');

class FollowingListsController{
	constructor(){
		this.followingListsApi = new FollowingListsApi();
		this.followersListsApi = new FollowersListsApi();
		this.notificationsApi = new NotificationsApi();
	}

	getFollowingList = asyncHandler(async(req, res) => {
		try {
			const followingList = await this.followingListsApi.getFollowingList(req.params.userid);
			res.json({success: true, data: followingList}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	followOrUnfollow = asyncHandler(async(req, res) => {
		try {
			await this.followingListsApi.addUserToOrRemoveUserFromFollowingList(req.user.id, req.params.userid);
			await this.followersListsApi.addUserToOrRemoveUserFromFollowersList(req.params.userid, req.user.id);
			//await this.notificationsApi.createNotification(newFollowerTitle(), newFollowerMessage(req.user.username), req.params.userid, 'others');
			res.json({success: true, message: `usuario ${req.user.id} comenzo/dejo de seguir a usuario ${req.params.userid}`}).status(200);
		} catch (err) {
			res.json({success: false, message: err.message}).status(500);
		}
	});  

}

module.exports = FollowingListsController;