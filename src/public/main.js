//ESTO TIENE QUE IR EN EL COMPONENTE PRINCIPAL DE LA APP
const socket = io({
	auth: {
		token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMzIwNjExfQ.x25ayDTqgrK7btTHuOjYRCUX31oqry_vpK8t1D4Gq6Q'
	}
});

let userData = null;

socket.on('user', (user) => {
	userData = user;
});

let chatId = 1;

socket.emit('get chat id', chatId);

socket.on('get messages', (messages)=> {
	console.log(messages);
});



var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (input.value && userData) {
		socket.emit('send message', input.value, userData.id, 1);
		input.value = '';
	}
});

socket.on('get new message', (messages)=> {
	console.log(messages);
});