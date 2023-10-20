const asyncHandler = require('express-async-handler');
const UsersApi = require('../services/users');

class UsersController{
	constructor(){
		this.usersApi = new UsersApi();
	}
	//SI NO PUEDO VISUALIZAR LA FOTO DE PERFIL, REVISAR EL BUCKET Y DESTILDAR LA OPCION DE BLOQUEAR ACCESO
	updateUserData = asyncHandler(async(req, res) => {
		try {
			const{username, fullName, bio, dayOfBirth} = req.body;
			const{id} = req.user;
			await this.usersApi.updateUserData(req.files.file.tempFilePath, req.files.file.name, id, username, fullName,  bio, dayOfBirth, `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.files.file.name}`);

			res.json({success: true, message: 'usuario actualizado'}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getMyProfile = asyncHandler(async(req, res) => {
		try {
			const user = await this.usersApi.getUserById(req.user.id);
			res.json({success: true, data: user}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getUserProfile = asyncHandler(async(req, res) => {
		try {
			const user = await this.usersApi.getUserById(req.params.userid);
			res.json({success: true, data: user}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

	getAllUsers = asyncHandler(async(req, res) => {
		try {
			const users = await this.usersApi.getAllUsers();
			res.json({success: true, data: users}).status(200);
		} catch (err) {
			res.json({success: false, message: err}).status(500);
		}
	});

}

module.exports = UsersController;