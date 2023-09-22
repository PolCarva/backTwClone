//ESTO TIENE QUE IR EN EL COMPONENTE PRINCIPAL DE LA APP
const socket = io({
	auth: {
		token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk1MjQ1NTYzfQ.Gcz8NYKy1dXi2gfVdsJdZET22gl36cJZLvXM0BbWZ2E'
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