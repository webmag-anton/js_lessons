document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body')
	let textElemHeaders = []

	function recursy(element) {
		// проходимся по всем дочерним узлам (элементам, текстам, комментам) и выводим их в консоль
		element.childNodes.forEach( node => {

			// затем проверяем, если у дочернего узла имя начинается с H и затем какая то цифра (H1 - H6), то добавляем
			// в массив textElemHeaders объект с именем и текстом заголовка (если нет совпадетий, то match() вернет null)
			if ( node.nodeName.match(/^H\d/) ) {
				console.log(node)

				const obj = {
					header: node.nodeName,
					content: node.textContent
				}
				textElemHeaders.push(obj)
			} else {
				// а если узел не является заголовком H1 - H6, то ищем заголовки в дочерних для него узлах
				recursy(node)
			}
		})
	}

	recursy(body)
	// отсылаем на сервер наши данные (метод POST), полученные от парсера и выводим в консоль ответ от сервера;
	// это фейковый REST API и он на самом деле не записывает те данные, что мы послали
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(textElemHeaders)
	})
		.then(response => response.json())
		.then(json => console.log('Ответ от сервера в формате JSON:', json))
		.catch(err => console.error(err))
  
})