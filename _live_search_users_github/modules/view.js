// Класс, отвечающий за визуальное отображение
export class View {
   
	constructor() {
		this.app = document.getElementById('app')
      // title
		this.title = this.createElement('h1', 'title')
		this.title.textContent = 'Github search users. SPA. GitHub API'
      // input
		this.searchLine = this.createElement('div', 'search-line')
		this.searchInput = this.createElement('input', 'search-input')
		this.searchCounter = this.createElement('span', 'counter')
      // empty users list
		this.main = this.createElement('div', 'main')
		this.usersWrapper = this.createElement('div', 'users-wrapper')
		this.usersList = this.createElement('ul', 'users')
      // button load more
		this.loadMoreBtn = this.createElement('button', 'btn')
		this.loadMoreBtn.textContent = 'загрузить ещё'
		this.loadMoreBtn.style.display = 'none'
		
		this.searchLine.append(this.searchInput, this.searchCounter)
		this.usersWrapper.append(this.usersList, this.loadMoreBtn)
		this.main.append(this.usersWrapper)

		this.app.append(this.title, this.searchLine, this.main)
	}
   // create element with class
	createElement(elementTag, elementClass) {
		const element = document.createElement(elementTag)
		if (elementClass) {
			element.classList.add(elementClass)
		}
		return element
	}
   // create user element li and push to list of users
	createUser(userData) {
		const userElement = this.createElement('li', 'user-prev')
		userElement.innerHTML = `<img class='user-prev-photo' 
                                 src='${userData.avatar_url}' 
                                 alt='${userData.login}' 
                              />
                              <span class="user-prev-name">${userData.login}</span>
                              `
		this.usersList.append(userElement)
	}

	toggleLoadMoreBtn(show) {
		this.loadMoreBtn.style.display = show ? 'block' : 'none'
	}
}