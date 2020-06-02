// класс используем сугубо в целях группировки функционала
export class Question {

   static create(question) {
      return fetch('https://vanilla-js-app-fde9e.firebaseio.com/questions.json', {
         method: 'POST',
         body: JSON.stringify(question),
         headers: {
            'Content-Type': 'application/json'
         }
      })
         .then(response => response.json())
         .then(response => {
            // в объект вопроса добавляем поле id со значением, 
            // равным крипто-имени вопроса в DB, и возвращаем question
            question.id = response.name
            return question
         })
         // затем добавляем его в localstorage
         .then(addToLocalStorage)
         // рендерим список из localstorage
         .then(Question.renderList)
   }

   static renderList() {
      const questions = getQuestionsFromLS()
      // создаем html-шаблон карточки(ек) из каждого элемента массива, если массив не пустой; 
      // метод map возвращает массив карточек, поэтому объединяем его в строку методом join()
      const html = questions.length
         ?  questions.map(toCard).join('')
         :  `<div class='mui--text-headline'>Вы пока ничего не спрашивали</div>`

      const $list = document.getElementById('list')
      $list.innerHTML = html
   }

   static fetch(token) {
      // если неправильный email/password при аутентификации, то token 
      // в ответе не получим, соответственно нужно обработать такой сценарий
      if (!token) {
         return Promise.resolve('<p class="error">У Вас нет токена</p>')
      }

      return fetch(`https://vanilla-js-app-fde9e.firebaseio.com/questions.json?auth=${token}`)
         .then(response => response.json())
         .then(response => {
            // если по какой то причине в вопросах есть ошибка
            if (response && response.error) {
               return `<p class="error">${response.error}</p>`
            }
            // если в response что то есть, то мапим массив ключей
            return response 
               ?  Object.keys(response).map(key => ({
                     ...response[key], // разворачиваем поля text и date
                     id: key
                  }))
               :  []
         })
   }

   static listToHTML(questions) {
      // если массив пустой, то предупреждаем что контента пока нет и нужно добавить вопросы
      return questions.length
         ?  `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
         :  '<p>вопросов пока нет</p>'
   }
}


function addToLocalStorage(question) {
   // не перезаписываем массив questions а добавляем в него новый вопрос
   const all = getQuestionsFromLS()
   all.push(question)
   // и затем перезаписываем questions в localStorage
   localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLS() {
   // если в localStorage еще нет questions, то парсим пустой массив
   return JSON.parse( localStorage.getItem('questions') || '[]' )
}

// каждый вопрос из массива преобразовываем в html-шаблон карточки вопроса
function toCard(question) {
   return `
      <div class='mui--text-black-54'>
         ${new Date(question.date).toLocaleDateString()} 
         ${new Date(question.date).toLocaleTimeString()}
      </div>
      <div>${question.text}</div>
      <br>
   `
}