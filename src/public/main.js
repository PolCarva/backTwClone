//ESTO TIENE QUE IR EN EL COMPONENTE PRINCIPAL DE LA APP
const socket = io({
	auth: {
		token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjkzMzk4NTk2fQ.4ET6OTs2OCDjt6-AMCsdEdWN3FLm6kHfLTfTLDx-s5U'
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