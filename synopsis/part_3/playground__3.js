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

// const requestURL = 'https://jsonplaceholder.typicode.com/users'

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

// sendRequest('GET', requestURL)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))

// const body = {
// 	name: 'anton', 
// 	age: 27
// }
// // во вкладке network видно как статус становится 201 - created (создание чего-то)
// sendRequest('POST', requestURL, body)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))



	// Пример fetch (GET):

// const requestFetchURL = 'https://jsonplaceholder.typicode.com/todos'

// async function sendFetchGET(url) {
// 	try {
// 		let response = await fetch(url) // (await возвращает результат промиса; fetch() возвращает промис)

// 		if (response.ok) { // если HTTP-статус в диапазоне 200-299
// 		  let json = await response.json()  // получаем тело ответа (await возвращает результат промиса; json() возвращает промис)
// 		  console.log(json)
// 		} else {
// 			console.error(`Ошибка HTTP: статус ${response.status}`)
// 		}
// 	} 
// 	catch(err) {
// 		console.error(`ошибка при запросе, возможно невалидный url!!!! ловим ошибку, выброшенную из fetch(). Объект ошибки - ${err}`)
// 	}
// }

// sendFetchGET(requestFetchURL)



	// пример fetch (POST):

// const requestFetchURL_POST = 'https://jsonplaceholder.typicode.com/albumsq' // albums

// function sendFetchPOST(method, url, body = null) {
// 	// так как тело запроса body – строка, то заголовок Content-Type по умолчанию будет text/plain
// 	const headers = {
// 		'Content-Type': 'application/json'
// 	}

// 	return fetch(url, {
// 		method: method,
// 		body: JSON.stringify(body),
// 		headers: headers
// 	})
// 		.then( response => {
// 			if (response.ok) {
// 				return response.json()
// 			}

// 			// если код HTTP-статуса не в диапазоне 200-299
// 			return response.json().then( error => {
// 				const e = new Error(`Что то пошло не так...  ошибка ${response.status}`)
// 				e.data = error
// 				throw e
// 			})
// 		})
// }

// const body = {
// 	name: 'Vladilen', 
// 	age: 26
// }
// sendFetchPOST('POST', requestFetchURL_POST, body)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err)) // отловим ошибку запроса fetch(), например если url https://jsonplac, а так же если !response.ok



/* 3.1  Fetch */


// // менее подходящий вариант, т.к. промисы ждут друг друга (await) + не сохраняется очередность в массиве ответов

// function getUsers(names) {
// 	const users = []

// 	names.forEach( async function(name) {
// 		try{
// 			let response = await fetch(`https://api.githuB.com/users/${name}`) 

// 			if (response.ok) {
// 				let user = await response.json()
// 				users.push(user)
// 			} else {
// 				users.push(null)
// 				console.error(`пользователя github с именем ${name} не существует !!`)
// 			}
// 		}
// 		catch(err) {
// 			users.push(null)
// 			console.error(`Невалидный url запроса fetch(); Объект ошибки - ${err}`)
// 		}
// 	})

// 	return users
// }

// let usersObject = getUsers(['webmag-anton', 'some-does-not-exist', 'qwerty'])
// console.log(usersObject)



// // Более правильный выриант, т.к. промисы не ждут друг друга; в то же время Promise.all() сохраняет последовательность вызовов

// async function getUsers(names) {
//   let jobs = []

//   for(let name of names) {
//     let job = fetch(`https://api.github.com/users/${name}`).then(
//       successResponse => {
//         if (successResponse.status != 200) {
//           return null;
//         } else {
//           return successResponse.json()
//         }
//       },
//       failResponse => {
//         return null
//       }
//     )
//     // пушим асинхронные обработчики then, которые выполнятся ( successResponse.json() ) в том же порядке благодаря Promise.all
//     jobs.push(job);
//   }

//   let results = await Promise.all(jobs)

//   return results
// }

// let usersObject = getUsers(['webmag-anton', 'some-does-not-exist', 'qwerty'])
// console.log(usersObject)





		/* Хранение данных в браузере */

const textarea = document.querySelector('.textarea__localStorage')

textarea.addEventListener('input', function() {
	localStorage.setItem('textarea', `${this.value}`)
})

textarea.value = localStorage.getItem('textarea')





		/* Анимация */

digit.onclick = function() {
	stripe.classList.add('animate')
}


// Событие transitionend
boat.onclick = function() {
  //...
  let times = 1

  function go() {
    if (times % 2) {
      // плыть вправо (если times не четное число)
      boat.classList.remove('back')
      boat.style.marginLeft = 100 * times + 200 + 'px'
    } else {
      // плыть влево
      boat.classList.add('back')
      boat.style.marginLeft = 100 * times - 200 + 'px'
    }
  }

  go()

  boat.addEventListener('transitionend', function() {
    times++;
    go()
  })
}


// Анимированный круг

let circle = document.createElement('div')
document.body.append(circle)
circle.style.cssText = `
	position: fixed;
	transform: translate(-50%, -50%);
	width: 0;
	height: 0;
	border-radius: 50%;
	background-color: red;
	transition: 2s ease;
`

function showCircle(cx, cy, radius) {
	circle.style.left = `${cx}px`
	circle.style.top = `${cy}px`
	circle.style.width = `${radius * 2}px`
	circle.style.height = `${radius * 2}px`
}

let circle_btn = document.querySelector('.circle_btn')
circle_btn.addEventListener('click', function() {
	showCircle(200, 200, 110)
})


// js анимация

let prev = performance.now();
let times = 0;

requestAnimationFrame(function measure(time) { // time = performance.now()
	document.querySelector('.jsAnimation').insertAdjacentHTML("afterEnd", Math.floor(time - prev) + " ");
	prev = time;

	if (times++ < 10) requestAnimationFrame(measure);
})





	/* Веб-компоненты */


// Пользовательские элементы (Custom Elements)

class TimeFormatted extends HTMLElement {

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

customElements.define("time-formatted", TimeFormatted);