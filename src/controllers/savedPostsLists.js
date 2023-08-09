const asyncHandler = require('express-async-handler');
const SavedPostsListsApi = require('../services/savedPostsLists');

class SavedPostsListsController{
	constructor(){
		this.savedPostsListsApi = new SavedPostsListsApi();
	}

	getSavedPostsLists = asyncHandler(async(req, res) => {
		try {
			const savedPostsList = await this.savedPostsListsApi.getSavedPostsList(req.user.id);
			res.json({success: true, data: savedPostsList}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	addPostToSavedPostsLists = asyncHandler(async(req, res) => {
		try {
			await this.savedPostsListsApi.addPostToSavedPostsList(req.params.postid, req.user.id);
			res.json({success: true, message: 'post guardado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	removePostFromSavedPostsLists = asyncHandler(async(req, res) => {
		try {
			await this.savedPostsListsApi.removePostFromSavedPostsList(req.user.id, req.params.postid);
			res.json({success: true, message: 'post eliminado de guardados'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

}

module.exports = SavedPostsListsController;