const socket = io({
	auth: {
		token: `Bearer ${localStorage.getItem('token')}`
	}
});

socket.on('users connected', (activeUsers) => {
	console.log(activeUsers);
});

let chatId = 4;

socket.emit('join chat', chatId);

socket.on('get messages', (messages)=> {
	console.log(messages);
});


var form = document.getElementById('form');
var input = document.getElementById('input');

input.addEventListener('keypress', () => {
	socket.emit('is typing', 'usuario 2');
});

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (input.value) {
		socket.emit('send message', input.value, 2, 4);
		input.value = '';
	}
});

socket.on('is typing', (username) => {
	console.log(`${username} is typing...`);
});

socket.on('get new message', (messages)=> {
	console.log(messages);
}); 