const User = require('../models/user');
const logger = require('../utils/logger');

class UsersDAO{

	async createUser(newUser){
		try{
			return User.create(newUser);
		}catch(err){
			logger.info(err);
		}
	}

	async getUserByUsername(username){
		try{
			return User.findOne({ where: { username } });
		}catch(err){
			logger.info(err);
		}
	}

	async getUserByMail(email){
		try{
			return User.findOne({ where: { email } });
		}catch(err){
			logger.info(err);
		}
	}

	async getUserById(id){
		try{
			return User.findOne({ where: { id } });
		}catch(err){
			logger.info(err);
		}
	}

	async getAllUsers(){
		try{
			return User.findAll();
		}catch(err){
			logger.info(err);
		}
	}
	/* 
    async updateUserChats(userId, chatId){
        try{
            return await User.findByIdAndUpdate(userId, {$push :{chats: chatId}})
        }catch(err){
            logger.info(err);
        }
    } */

	async updateUserPassword(userId, newPassword){
		try{
			return User.update({id: userId}, {password: newPassword});
		}catch(err){
			logger.info(err);
		}
	}

	async updateUserData(userId){
		try{
			return User.update({id: userId}, {});
		}catch(err){
			logger.info(err);
		}
	}
}

module.exports = UsersDAO;