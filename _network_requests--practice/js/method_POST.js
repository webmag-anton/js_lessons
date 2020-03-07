// запускаем сервер: json-server db.json (для запуска серверной  части, что бы файл с БД (db.json) отдавал данные)
// что бы у json-server путь отличался от browser-sync нужно установить порт не 3000: json-server db.json -p 4000
// затем устанавливаем plugin browser-sync и запускаем: browser-sync -> start file (в консоле ctrl + c для остановки)
// итого: 1) json-server db.json -p 4000    2) browser-sync -> start file ( default: http://localhost:3000 ) 

document.addEventListener('DOMContentLoaded', () => {

	const form = document.querySelector('.form_POST')

	/* XMLHttpRequest */

	// function req(e) {
	// 	e.preventDefault()

		// // Тестируем работу POST (в базу будут сохраняться объекты)
		// let body = {
		// 	name: 'Anton',
		// 	surname: 'Byshok',
		// 	age: 27,
		// 	id: Math.random()
		// }
		// let json = JSON.stringify(body)

		// // Отправляем данные формы с помощью класса FormData, преобразованного в объект,
		// // который превратим в строку для отправки в XMLHttpRequest (json-server работает с JSON)
		// let formData = new FormData(form) 
		// formData.append('id', Math.random())
		// let obj = {}
		// for (let [name, value] of formData) {
		// 	obj[name] = value
		// } 
		// console.log(obj)
		// let json = JSON.stringify(obj)

		// const request = new XMLHttpRequest()
		// request.open('POST', 'http://localhost:4000/people')
		// request.setRequestHeader('Content-type', 'application/json; charset=utf-8')
		// request.send(json)

		// request.addEventListener('load', function() {
		// 	if (request.status === 201 ) {
		// 		let data = JSON.parse(request.response)
		// 		console.log(data)
		// 	} else {
		// 		console.error('Что-то пошло не так')
		// 	}
		// })

	// }

	/* XMLHttpRequest END */

	/* fetch */

	async function req(e) {
		e.preventDefault()

		// // Отправляем данные формы с помощью класса FormData, преобразованного в объект,
		// // который превратим в строку для отправки в XMLHttpRequest (json-server работает с JSON)
		let formData = new FormData(form) 
		formData.append('id', Math.random())
		let obj = {}
		for (let [name, value] of formData) {
			obj[name] = value
		} 
		let json = JSON.stringify(obj)

		let response = await fetch('http://localhost:4000/people', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: json
		})
	} 

	/* fetch END */

	document.querySelector('.form_POST').addEventListener('submit', req)

})  // DOMContentLoaded END