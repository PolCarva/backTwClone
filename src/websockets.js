const httpServer = require('./app');
const { Server } = require('socket.io');
const io = new Server(httpServer);
const logger = require('./utils/logger');
const jwt = require('jsonwebtoken');

const UsersApi = require('./services/users');
const usersApi = new UsersApi();
const MessagesApi = require('./services/messages');
const messagesApi = new MessagesApi();

io.use(async(socket, next) => {
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
});  