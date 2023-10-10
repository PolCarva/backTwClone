const socket = io('https://socialmediaclone-production-1e63.up.railway.app',{
	auth: {
		token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk2ODYxMDQwfQ.7XxePWbJSrfFS6NsCMN-NzHCUpHEjIQ_BZuFNfIEOp8'
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