//ESTO TIENE QUE IR EN EL COMPONENTE PRINCIPAL DE LA APP
const socket = io.connect('https://social-media-clone-gciq.vercel.app',{
	auth: {
		token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjk1OTg4MjM5fQ.f6apyGHsPPYfbMjfx4hQgTk-SjhGQF2I0nxwSTs66qI'
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