// Класс, отвечающий за поиск
export class Search {
   // принимаем в конмтруктор экземпляр класса View, у которого св-ва и методы отвечают за отображение приложения
	constructor(view) {
		this.view = view // свойству view присваиваем экземпляр класса View, получая доступ к UI, который мы будем менять при поиске
		this._USERS_PER_PAGE = 10
		this.currentPage = 1
      // вызов debounce возвращает отдекорированную функцию searchUsers, которая будет вызываться при отпускании клавиши;
      // т.к. searchUsers стрелочная ф-я, то у нее нет своего this, то есть при вызове будет браться внешний this (метода constructor) 
		this.view.searchInput.addEventListener('keyup', this.debounce( this.searchUsers, 500 )) 
		this.view.loadMoreBtn.addEventListener('click', this.loadUsers)
	}

   // стрелочная ф-я что бы не было потери контекста
	searchUsers = async () => {
		const searchValue = this.view.searchInput.value

		// если что то ввели, т.е. поле инпут не пустое, то выполняем запрос
		if (searchValue) {
			// очищаем вывод пользователей перед показом c другим именем
			this.clearUsers()
			// обновляем показ с 1 страницы по новому имени пользователя
			this.currentPage = 1
			// в url GET запроса после ? следуют параметры запроса, разделенные между собой &
			let response = await fetch(`https://api.github.com/search/users
												 ?q=${searchValue}&per_page=${this._USERS_PER_PAGE}&page=${this.currentPage}
												`)
			if (response.ok) {
				let json = await response.json()  // получаем тело ответа (await возвращает результат промиса; json() возвращает промис)
				// показ кнопки если аргумент возвращает true
				this.view.toggleLoadMoreBtn( json.total_count > this._USERS_PER_PAGE  &&  json.items * this.currentPage !== json.total_count )
				// если нет совпадений
				if (json.total_count == 0) this.view.usersList.innerHTML = 'Нет таких пользователей =('

				json.items.forEach(user => this.view.createUser(user))
				console.log(json)
			} else {
				console.error(`Ошибка: статус ${response.status}. Возможно сервер не может так быстро отвечать, стоят ограничения`)
			}
		} else { // иначе очищаем вывод пользователей
			this.clearUsers()
		}
	}

	loadUsers = async () => {
		this.currentPage++  // увеличиваем страницу вывода на 1 - следующие 10 ( _USERS_PER_PAGE ) пользователей
		// ... и выполняем запрос
		const searchValue = this.view.searchInput.value
		let response = await fetch(`https://api.github.com/search/users
										    ?q=${searchValue}&per_page=${this._USERS_PER_PAGE}&page=${this.currentPage}
											`)
		if (response.ok) {
			let json = await response.json()

			this.view.toggleLoadMoreBtn( json.total_count > this._USERS_PER_PAGE  &&  json.items * this.currentPage !== json.total_count )

			json.items.forEach(user => this.view.createUser(user))
			console.log(json)
		} else {
			console.error(`Ошибка: статус ${response.status}. Возможно сервер не может так быстро отвечать, стоят ограничения`)
		}
	}

	clearUsers() {
		this.view.usersList.innerHTML = ''
		this.view.toggleLoadMoreBtn( false )
	}

	// декоратор, что б не очень часто делать запрос на GitHub при вводе в поле поиска
	// debounce(func, ms) {
	// 	let isReady = true

	// 	return function(par) {
	// 		if (isReady) {
	// 			func(par)
	// 		} else {
	// 			console.log(`еще не прошло ${ms}ms с последнего вызова`)
	// 			return;
	// 		} 

	// 		isReady = false	

	// 		setTimeout(() => {isReady = true}, ms)
	// 	}
	// }

	// Задержка ввода данных для отправки запроса 
	// (этот вариант с задержкой при изначальном вводе + отрабатывает при быстрой очистке поиска)
	debounce(func, wait, immediate) {
		let timeout;
		return function() {
			const context = this, args = arguments;
			const later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

}