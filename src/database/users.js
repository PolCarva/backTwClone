const User = require("../models/user");
const logger = require("../utils/logger");
const IncludeOptions = require("./includeOptions");

class UsersDAO {
  constructor() {
    this.includeOptions = new IncludeOptions();
  }

  async createUser(newUser) {
    try {
      return User.create(newUser);
    } catch (err) {
      logger.info(err);
    }
  }

  async getUserByUsername(username) {
    try {
      return User.findOne({
        where: {
          username,
        },
      });
    } catch (err) {
      logger.info(err);
    }
  }

  async getUserByMail(email) {
    try {
      return User.findOne({
        where: {
          email,
        },
      });
    } catch (err) {
      logger.info(err);
    }
  }

  async getUserById(id) {
    try {
      return User.findOne({
        where: {
          id,
        },
        include: this.includeOptions.getUserIncludeOptions(),
      });
    } catch (err) {
      logger.info(err);
    }
  }

  async getUsersById(id) {
    try {
      return User.findAll({
        where: {
          id,
        },
      });
    } catch (err) {
      logger.info(err);
    }
  }

  async getAllUsers() {
    try {
      return User.findAll({
        attributes: ["username", "id", "full_name", "profile_photo"],
      });
    } catch (err) {
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

  async updateUserPassword(userId, newPassword) {
    try {
      return User.update(
        { password: newPassword },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (err) {
      logger.info(err);
    }
  }

  async updateUserData(userId, username, fullName, profilePhoto, bio) {
    try {
      return User.update(
        { username, full_name: fullName, profile_photo: profilePhoto, bio },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (err) {
      logger.info(err);
    }
  }

  async updateUserStatus(userId, onlineValue) {
    try {
      return await User.update(
        { online: onlineValue },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (err) {
      logger.info(err);
    }
  }

  async deleteUser(userId) {
    try {
      return User.destroy({ id: userId });
    } catch (err) {
      logger.info(err);
    }
  }

  async activateUser(userId) {
    try {
      return User.update(
        { activated: true },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (err) {
      logger.info(err);
    }
  }
}

module.exports = UsersDAO;
