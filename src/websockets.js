/* const httpServer = require('./app');
const { Server } = require('socket.io');
const io = new Server(httpServer);
const logger = require('./utils/logger');
const jwt = require('jsonwebtoken');

const UsersApi = require('./services/users');
const usersApi = new UsersApi();
const MessagesApi = require('./services/messages');
const messagesApi = new MessagesApi();
const ChatsApi = require('./services/chats');
const chatsApi = new ChatsApi();

let activeUsers = [];

io.use(async(socket, next) => {
	const authorizationHeader = socket.handshake.auth.token;

	if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
		const token = authorizationHeader.split(' ')[1];
		try {
			const decoded = jwt.verify(token, 'adsfdcsfeds3w423ewdas');
			socket.user = await usersApi.getUserById(decoded.id);
			io.emit('new user', socket.user);
			next();
		} catch (error) {
			socket.emit('error', 'token invalido');
		}
	}else {
		socket.emit('error', 'Se requiere autenticación');
	}
}).on('connection', async(socket) => {
	if(!activeUsers.some((user) => user.id === socket.user.dataValues.id)){
		activeUsers.push({
			userId: socket.user.dataValues.id,
			socketId: socket.id
		});
	}

	console.log('users connected', activeUsers);
	io.emit('users connected', activeUsers);

	socket.on('disconnect', () => {
		activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
		io.emit('users connected', activeUsers);
	});
	
	socket.on('get user id', async(id) => {
		try {
			const user = await usersApi.getUserById(id);
			socket.emit('get user', user.dataValues);
		} catch (err) {
			logger.info(err);
		}
	});  

	socket.on('join chat', async(chatId) => {
		try {
			const messages = await messagesApi.getMessagesInChat(chatId);
			await messagesApi.readMessage(socket.user.dataValues.id, chatId);
			socket.emit('get messages', messages);
		} catch (err) {
			logger.info(err);
		}
	});

	socket.on('is typing', async(username, chatId) => {
		await messagesApi.readMessage(socket.user.dataValues.id, chatId);
		socket.broadcast.emit('is typing', {username, chatId});
	});

	socket.on('send message', async(msj, userId, chatId) => {
		try {
			const usersId = await chatsApi.getChatUsers(chatId);
			const newMessage = await messagesApi.createMessage(msj, userId, chatId);
			io.emit('get new message', {newMessage, usersId: [usersId[0].dataValues.user_id, usersId[1].dataValues.user_id]});
			
		} catch (err) {
			logger.info(err);
		} 

	});  
}); */