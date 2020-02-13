
// Promise вернется быстрей, значит 'готово =)' выведется раньше, хоть и стоит за асинхронной ф-ей
async function myRespond() {
	let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
	let response = await fetch(url);
	let commits = await response.json(); // читаем ответ в формате JSON
	alert( commits[0].author.login );
}
myRespond()

function delay(ms) {
  return new Promise((resolve, reject) => {
  	setTimeout( () => resolve('готово'), ms)
  })
}
delay(300).then((val) => alert(val + ' =)'));

alert('сначала синхронный код');