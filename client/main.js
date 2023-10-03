/* //Ejercicio 1

/*  const carDebugging = (string) => {

    const engine = string.split(' ')[2].split('-');
    let xSeRepite = false;
    const engineSorted = engine.sort();
    const engineInPosition = [];

    for (let i = 0; i < engineSorted.length ; i++) {
        if(engine[i] === 'X' && engine[i - 1] === 'X'){
            xSeRepite = true
        } 
        if(!isNaN(parseInt(engineSorted[i]))){
            if((parseInt(engineSorted[i])) == i+1){
                engineInPosition.push(engineSorted[i])
            }else{
                engineInPosition.push(null)
                let temp = engineSorted[i];
                engineSorted[i] = engineSorted[i+1];
                engineSorted[i+1] = temp;
            }
        }else{
            engineInPosition.push(null)
        }
    } 

    if(xSeRepite){
        return engineInPosition.map((el, idx) => el === null ? idx : '').filter(String).reverse().join('-');
    } else{
        return engineInPosition.map((el, idx) => el === null ? idx : '').filter(String).join('-');
    }
}

console.log(carDebugging('Ford V8 1-X-4-2-X-3-X-8'));
console.log(carDebugging('Dodge V10 1-X-X-4-3-6-5-X-X-2')); 

//Ejercicio 2
const solution = (s, t) => {

    if(s.length - t.length !== 0 && s.length - t.length !== 1 && s.length - t.length !== -1  ){
        return 'imposible'
    }else{
        if(s.length - t.length === -1){
            let equalCharsCount = 0;
            for (let i = 0; i < s.length; i++) {
                if(s[i] === t[i]){
                    equalCharsCount++;
                }
            }
            if(equalCharsCount === s.length){
                return `add ${t[t.length-1]}`
            }else{
                return 'imposible'
            }
        }else if(s.length - t.length === 0){
            let differentCharsCount = 0;
            let differentChars = [];
            for (let i = 0; i < s.length; i++) {
                if(s[i] !== t[i]){
                    differentCharsCount++;
                    differentChars.push(s[i]);
                }
            }
            if(differentCharsCount === 2){
                return `swap ${differentChars}`
            }else{
                return 'imposible'
            }
        }else if(s.length - t.length === 1){
            let sHasAdjacentChars = false;
            let adjacentChar;
            let adjacentChar2;
            for (let i = 0; i < s.length; i++) {
                if(s[i] === s[i-1]){
                    sHasAdjacentChars=true;
                    adjacentChar=s[i];
                    adjacentChar2=s[i];
                }
            }
            if(sHasAdjacentChars){
                const newStringArr = []
                for (const char of s) {
                    if(char !== adjacentChar){
                        newStringArr.push(char)
                    }else{
                        adjacentChar=null
                    } 
                }
                if(newStringArr.join('') === t){
                    return `join ${adjacentChar2}`
                }else{
                    return 'imposible'
                }
            }else{
                return 'imposible'
            }
        }
    }
}
console.log(solution('hoola', 'hola')); */

//ESTO TIENE QUE IR EN EL COMPONENTE PRINCIPAL DE LA APP
const socket = io.connect('https://socialmediaclone-production-1e63.up.railway.app/',{
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