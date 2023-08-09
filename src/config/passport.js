const passport = require('passport');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const logger = require('../utils/logger');
const hash = require('../utils/hashing');

const UsersDAO = require('../database/users');
//const User = require('../models/user');
const usersDAO = new UsersDAO();

const FollowersListsDAO = require('../database/followersLists');
const followersListsDAO = new FollowersListsDAO();

const FollowingListsDAO = require('../database/followingLists');
const followingListsDAO = new FollowingListsDAO();

const SavedPostsListsDAO = require('../database/savedPostsLists');
const savedPostsListsDAO = new SavedPostsListsDAO();

passport.use('register', new localStrategy({
	passReqToCallback: true
}, async(req, username, password, done) => {
	const {email, full_name} = req.body;

	if( !username || !email || !password || !full_name ){
		logger.info('completa todos los campos');
		return done(null, false);
	}

	const usuario = await usersDAO.getUserByUsername(username);
	if(usuario){
		return done('nombre de usuario en uso');
	} 

	const userEmail = await usersDAO.getUserByMail(email);
	if(userEmail){
		return done('el mail ya esta en uso');
	}

	if(password.length < 8){
		logger.info('la contrasenia debe tener al menos 8 caracteres');
		return done(null, false);
	}

	const newUser = await usersDAO.createUser({
		username,
		email,
		full_name,
		password: hash(password)
	});
	
	await followersListsDAO.createFollowersList(newUser.id);
	await followingListsDAO.createFollowingList(newUser.id);
	await savedPostsListsDAO.createSavedPostsList(newUser.id);

	done(null, newUser);}
));

passport.use('login', new localStrategy({ 
	passReqToCallback: true 
},  async(req, username, password, done) => {
	if(!username || !password){
		return done('por favor complete todos los campos');
	}

	const user = await usersDAO.getUserByUsername(username);

	if(!user){
		return done('usuario o contrasenia incorrectos');
	}
	const correctPassword = await bcrypt.compare(password, user.password);

	if (!user || !correctPassword){
		return done('usuario o contrasenia incorrectos');
	} 

	if(!user.activated){
		return done('usuario no activado');
	}

	return done(null, user);
}
));

passport.serializeUser((user, done) => {
	if(process.env.AUTH_STRATEGY === 'google'){
		return done(null, user.id);
	}
	return done(null, user.username);
});

passport.deserializeUser(async(user, done) => {
	if(process.env.AUTH_STRATEGY === 'google'){
		const usuario = await usersDAO.getUserById(user);
		return done(null, usuario);
	}
	const usuario = await usersDAO.getUser(user);
	return done(null, usuario);
});