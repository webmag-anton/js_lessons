import './styles.css'
import { isValid, createModal } from './utils'
import { Question } from './question'
import { getAuthFormHTML, authWithEmailAndPassword } from './auth'


const $form = document.getElementById('form')
const $input = $form.querySelector('#question-input')
const $submitBtn = $form.querySelector('#submit')
const $modalBtn = document.getElementById('modal-btn')

window.addEventListener('load', Question.renderList)

$form.addEventListener('submit', submitFormHandler)
$input.addEventListener('input', () => {
   // block button if typed < 10 signs
   $submitBtn.disabled = !isValid($input.value)
})

function submitFormHandler(e) {
   e.preventDefault()

   if (isValid($input.value)) {
      const question = {
         text: $input.value.trim(),
         date: new Date().toJSON()
      }

      $submitBtn.disabled = true // блокируем кнопку пока идет запрос 

      // async request to server to save question
      Question.create(question).then(() => {
         // очищаем input, удаляем MUI валидацию удалением 
         // классов у инпута и разблокируем кнопку после запроса
         $input.value = ''
         $input.className = ''
         $submitBtn.disabled = false
      })
   }
}


$modalBtn.addEventListener('click', openModal)



function openModal() {
   createModal('Авторизация', getAuthFormHTML())

   // отменяем перезагрузку формы в модалке и выполняем логику по авторизации после 
   // рендеринга в DOM, т.к. до рендеринга еще нет DOM-node, которому вешать прослушку
   document
      .getElementById('auth-form')
      .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(e) {
   e.preventDefault()

   const $email = e.target.querySelector('#email').value
   const $password = e.target.querySelector('#password').value
   const $btn = e.target.querySelector('button')

   $btn.disabled = true
   //  в ответе при аутентификации получаем idToken, с помощью 
   //  которого можно делать запрос на сервер для получения списка вопросов
   authWithEmailAndPassword($email, $password)
      .then( token => {
         return Question.fetch(token)
      })
      .then(renderModalAfterAuth)
      // если произошла ошибка, то разблокируем кнопку
      .then(() => $btn.disabled = false)
}

function renderModalAfterAuth(content) {
   if (typeof content === 'string') {
      createModal('Ошибка', content)
   } else {
      createModal('Список вопросов', Question.listToHTML(content))
   }
}