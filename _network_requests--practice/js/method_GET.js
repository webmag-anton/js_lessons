// запускаем сервер: json-server db.json (для запуска серверной  части, что бы файл с БД (db.json) отдавал данные)
// что бы у json-server путь отличался от browser-sync нужно установить порт не 3000: json-server db.json -p 4000
// затем устанавливаем plugin browser-sync и запускаем: browser-sync -> start file (в консоле ctrl + c для остановки)
// итого: 1) json-server db.json -p 4000    
// 				2) browser-sync -> start file ( default: http://localhost:3000 ) 
// 					 или в папке с проектом через консоль: browser-sync start --server 

document.addEventListener('DOMContentLoaded', () => {

	function req() {

		/* XMLHttpRequest */

		// const request = new XMLHttpRequest()
		// request.open('GET', 'http://localhost:4000/people')
		// request.setRequestHeader('Content-type', 'application/json; charset=utf-8')
		// request.send()

		// // т.к. мы слушаем изменение стадий readyState, то до вывода данных мы 
		// // увидим 2 ошибки: когда readyState === 2 и когда readyState === 3;
		// request.addEventListener('readystatechange', function() {
		// 	if (request.readyState === 4 && request.status === 200 ) {
		// 		let data = JSON.parse(request.response)
		// 		console.log(data)
		// 	} else {
		// 		console.error('Что-то пошло не так')
		// 	}
		// })

		// // поэтому лучше ставить слушатель события load (когда readyState === 4)
		// request.addEventListener('load', function() {
		// 	if (request.status === 200 ) {
		// 		let data = JSON.parse(request.response)
		// 		console.log(data)
		// 		createCards(data)
		// 	} else {
		// 		console.error('Что-то пошло не так')
		// 	}
		// })

		/* XMLHttpRequest END */

		/* fetch */

		fetch('http://localhost:4000/people')
			.then(data => data.json())
			.then(data => createCards(data))
			.catch(err => console.log(err))

		/* fetch END */

		this.remove() // внутри обработчика события this всегда ссылается на прослушиваемый объект (button)
	}

	document.querySelector('.jsonBtn_GET').addEventListener('click', req, {'once': true})


	function createCards(response) {
		response.forEach( item => {
			let card = document.createElement('div')
			card.classList.add('card')

			let icon;
			if (item.sex == 'male' ) {
				icon = 'icons/mars.png'
			} else {
				icon = 'icons/female.png'
			}

			card.innerHTML = `
			<img src="${item.photo}" alt="">
			<div class="name">${item.name} ${item.surname}</div>
			<div class="sex">
			<img src="${icon}" alt="male">
			</div>
			<div class="age">${item.age}</div>
			`
			document.querySelector('.app').append(card)
		})
	}

}) // DOMContentLoaded END