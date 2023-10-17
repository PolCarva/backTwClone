const socket = io({
	auth: {
		token: `Bearer ${localStorage.getItem('token')}`
	}
});

let userData = null;

socket.on('user', (user) => {
	userData = user;
});

let chatId = 1;

socket.emit('join chat', chatId);

socket.on('get messages', (messages)=> {
	console.log(messages);
});


var form = document.getElementById('form');
var input = document.getElementById('input');

input.addEventListener('keypress', () => {
	socket.emit('is typing', userData.username);
});

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (input.value && userData) {
		socket.emit('send message', input.value, userData.id, chatId, 2);
		input.value = '';
	}
});

socket.on('is typing', (username) => {
	console.log(`${username} is typing...`);
});

socket.on('get new message', (messages)=> {
	console.log(messages);
}); 