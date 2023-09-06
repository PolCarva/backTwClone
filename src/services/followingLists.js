const User_FollowingListsDAO = require('../database/users_followingLists');
const FollowingListsDAO = require('../database/followingLists');
const FollowersListsDAO = require('../database/followersLists');
const NotificationsApi = require('./notifications');
const { newFollowerTitle, newFollowerMessage } = require('../utils/notificationsMessages');

class FollowingListsApi{
	constructor(){
		this.users_followingListsDAO = new User_FollowingListsDAO();
		this.followingListsDAO = new FollowingListsDAO();
		this.followersListsDAO = new FollowersListsDAO();
		this.notificationsApi = new NotificationsApi();
	}
    
	async getFollowingList(userId){
		return await this.users_followingListsDAO.getUserFollowingList(userId);
	}

	async addUserToOrRemoveUserFromFollowingList(myUserId, targetUserId, userUsername){
		const notificationExist = await this.notificationsApi.getUserNotificationByMessage(targetUserId, newFollowerMessage(userUsername));
		if(notificationExist !== null){
			await notificationExist.destroy();
		}else{
			await this.notificationsApi.createNotification(newFollowerTitle(), newFollowerMessage(userUsername), targetUserId, 'others');
		}
		return await this.followingListsDAO.addUserToOrRemoveUserFromFollowingList(myUserId, targetUserId);
	}


}

module.exports = FollowingListsApi;