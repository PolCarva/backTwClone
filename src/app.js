const express = require('express');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const session = require('cookie-session');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const{ Server: HttpServer } = require('http');
const logger = require('./utils/logger');

//SWAGGER
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = require('./config/swaggerSpec');

//SETTINGS
const app = express(); 
const httpServer = new HttpServer(app);

require('dotenv').config();
require('./config/passport');

//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(session({
	cookie:{
		secure: true,
		maxAge:60000
	},
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: ['Access-Control-Allow-Origin', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
	credentials: true
}));
app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: './uploads'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));


//WEBSOCKETS SETTINGS
const { Server } = require('socket.io');
const io = new Server(httpServer);

const jwt = require('jsonwebtoken');

const UsersApi = require('./services/users');
const usersApi = new UsersApi();
const MessagesApi = require('./services/messages');
const messagesApi = new MessagesApi;

/* io.use(async(socket, next) => {
	const authorizationHeader = socket.handshake.auth.token;

	if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
		const token = authorizationHeader.split(' ')[1];
		try {
			const decoded = jwt.verify(token, 'adsfdcsfeds3w423ewdas');
			socket.user = await usersApi.getUserById(decoded.id);
			socket.emit('user', socket.user.dataValues);
			next();
		} catch (error) {
			socket.emit('error', 'token invalido');
		}
	}else {
		socket.emit('error', 'Se requiere autenticación');
	}
}).on('connection', async(socket) => {
	try {
		socket.user.dataValues.online = true;
		await usersApi.updateUserStatus(socket.user.dataValues.id, true);
		logger.info(`${socket.user.dataValues.username} connected`);
	} catch (error) {
		logger.info(error);
	}
	
	socket.on('get chat id', async(chatId) => {
		try {
			const messages = await messagesApi.getMessagesInChat(chatId);
			socket.emit('get messages', messages);
		} catch (err) {
			logger.info(err);
		}
	});


	socket.on('send message', async(msj, userId, chatId) => {
		try {
			await messagesApi.createMessage(msj, userId, chatId);
			const messages = await messagesApi.getMessagesInChat(chatId);
			socket.emit('get new message', messages);
		} catch (err) {
			logger.info(err);
		}

	});

	socket.on('disconnect', async() => {
		await usersApi.updateUserStatus(socket.user.dataValues.id, false);
		logger.info(`${socket.user.dataValues.username} disconnected`);
	});
});  */

//ROUTES

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/indexx.html');
});

const AuthRouter  = require('./routes/auth');
const PostsRouter  = require('./routes/posts');
const FollowersListsRouter  = require('./routes/followersLists');
const FollowingListsRouter  = require('./routes/followingLists');
const PostCommentsRouter  = require('./routes/postComments');
const CommentRepliesRouter  = require('./routes/commentReplies');
const NotificationsRouter  = require('./routes/notifications');
const SavedPostsListsRouter  = require('./routes/savedPostsLists');
const RetweetsRouter  = require('./routes/retweets');
const LikesRouter  = require('./routes/likes');
const UsersRouter  = require('./routes/users');
const ChatsRouter  = require('./routes/chats');
const MessagessRouter  = require('./routes/messages');

const authRouter = new AuthRouter();
const postsRouter = new PostsRouter();
const followersListsRouter = new FollowersListsRouter();
const followingListsRouter = new FollowingListsRouter();
const postCommentsRouter = new PostCommentsRouter();
const commentRepliesRouter = new CommentRepliesRouter();
const notificationsRouter = new NotificationsRouter();
const savedPostsListsRouter = new SavedPostsListsRouter();
const retweetsRouter = new RetweetsRouter();
const likesRouter = new LikesRouter();
const usersRouter = new UsersRouter();
const chatsRouter = new ChatsRouter();
const messagessRouter = new MessagessRouter();

app.use('/api', authRouter.start());
app.use('/api', postsRouter.start());
app.use('/api', followersListsRouter.start());
app.use('/api', followingListsRouter.start());
app.use('/api', postCommentsRouter.start());
app.use('/api', commentRepliesRouter.start());
app.use('/api', notificationsRouter.start());
app.use('/api', savedPostsListsRouter.start());
app.use('/api', retweetsRouter.start());
app.use('/api', likesRouter.start());
app.use('/api', usersRouter.start());
app.use('/api', chatsRouter.start());
app.use('/api', messagessRouter.start());

module.exports = httpServer;