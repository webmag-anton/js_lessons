'use strict';


		/* Сетевые запросы */


// // Promise вернется быстрей, значит 'готово =)' выведется раньше, хоть и стоит за асинхронной ф-ей
// async function myRespond() {
// 	let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// 	let response = await fetch(url);
// 	let commits = await response.json(); // читаем ответ в формате JSON
// 	alert( commits[0].author.login );
// }
// myRespond()

// function delay(ms) {
//   return new Promise((resolve, reject) => {
//   	setTimeout( () => resolve('готово'), ms)
//   })
// }
// delay(300).then((val) => alert(val + ' =)'));

// alert('сначала синхронный код');




// Пример XMLHttpRequest:

// const requestURL = 'https://jsonplaceholder.typicode.com/userse'

// function sendRequest(method, url, body = null) {
// 	return new Promise( (resolve, reject) => {
// 		const xhr = new XMLHttpRequest()
// 		xhr.open(method, url) // конфигурируем запрос
// 		// указываем, что отпраляем данные в формате json (по дефолту стоит text/plain)
// 		xhr.setRequestHeader('Content-Type', 'application/json') 
// 		xhr.send( JSON.stringify(body) ) // для GET без аргумента!

// 		xhr.responseType = "json" // чтобы ответ был в виде распарсеного json

// 		xhr.onload = () => {
// 			if (xhr.status >= 400) { // если статус-код > 400 (ошибка)
// 				reject(xhr.response)
// 			} else {
// 				resolve(xhr.response)
// 			}
// 		}
// 		xhr.onerror = () => {
// 			console.log('запрос не может быть выполнен, например, нет соединения или невалидный URL')
// 		}
// 	})
// }

// // sendRequest('GET', requestURL)
// // 	.then(data => console.log(data))
// // 	.catch(err => console.log(err))

// const body = {
// 	name: 'anton', 
// 	age: 27
// }
// // во вкладке network видно как статус становится 201 - created (создание чего-то)
// sendRequest('POST', requestURL, body)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))



// Пример fetch (GET):

const requestFetchURL = 'https://jsonplaceholder.typicode.com/todos'

async function sendFetchGET(url) {
	try {
		let response = await fetch(url) // (await возвращает результат промиса; fetch() возвращает промис)

		if (response.ok) { // если HTTP-статус в диапазоне 200-299
		  let json = await response.json()  // получаем тело ответа (await возвращает результат промиса; json() возвращает промис)
		  console.log(json)
		} else {
			console.error(`Ошибка HTTP: статус ${response.status}`)
		}
	} 
	catch(err) {
		console.error(`ошибка при запросе, возможно невалидный url!!!! ловим ошибку, выброшенную из fetch(). Объект ошибки - ${err}`)
	}
}

sendFetchGET(requestFetchURL)



// пример fetch (POST):

const requestFetchURL_POST = 'https://jsonplaceholder.typicode.com/albumsq' // albums

function sendFetchPOST(method, url, body = null) {
	// так как тело запроса body – строка, то заголовок Content-Type по умолчанию будет text/plain
	const headers = {
		'Content-Type': 'application/json'
	}

	return fetch(url, {
		method: method,
		body: JSON.stringify(body),
		headers: headers
	})
		.then( response => {
			if (response.ok) {
				return response.json()
			}

			// если код HTTP-статуса не в диапазоне 200-299
			return response.json().then( error => {
				const e = new Error(`Что то пошло не так...  ошибка ${response.status}`)
				e.data = error
				throw e
			})
		})
}

const body = {
	name: 'Vladilen', 
	age: 26
}
sendFetchPOST('POST', requestFetchURL_POST, body)
	.then(data => console.log(data))
	.catch(err => console.log(err)) // отловим ошибку запроса fetch(), например если задать url https://jsonplacehol