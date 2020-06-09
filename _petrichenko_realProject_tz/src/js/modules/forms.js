import checkNumInputs from './checkNumInputs'


export default function forms(state) {

   const forms = document.querySelectorAll('form'),
         inputs = document.querySelectorAll('input'),
         phoneInputs = document.querySelectorAll('input[name="user_phone"]')

   // по ТЗ, в поле с телефоном можно вводить только цифры => заменяем не число путой строкой
   checkNumInputs('input[name="user_phone"]')

   // состояния отправки
   const message = {
      loading: 'Загрузка...',
      success: 'Спасибо, скоро с Вами свяжутся',
      failure: 'Что то пошло не так...'
   }

   // очищаем инпуты во всех формах
   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = ''
      })
   }

   // AJAX POST-запрос с помощью fetch
   const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading

      let response = await fetch(url, {
         method: 'POST',
         body: data
         // т.к. отправляем FormData, то headers не указываем
      })

      return await response.text()  // метод text() (как и json()) асинхронен и возвращает промис
   }

   // обрабатываем все отпрвки форм
   forms.forEach(item => {
      item.addEventListener('submit', e => {
         e.preventDefault()
         // при отправке формы создаем блок для вывода состояния отправки
         let statusMessage = document.createElement('div')
         statusMessage.classList.add('status')
         item.append(statusMessage)

         // для сбора всех данных в отправляемой форме используем объект FormData
         const formData = new FormData(item)
         // добавляем данные объекту FormData из объкта состояния, если отправляем форму в калькуляторе
         if (item.getAttribute('data-calc') === 'end') {
            for (let key in state) {
               formData.append(key, state[key])
            }
         }

         // server.php возвращает (в виде строки) массив тех данных, которые пользователь отправил
         postData('./assets/server.php', formData)
            .then(res => {
               console.log('---', res)
               statusMessage.textContent = message.success
            })
            .catch(() => {
               statusMessage.textContent = message.failure
            })
            .finally(() => {
               // по итогу очищаем инпуты во всех формах и удаляем уведомление через 5 сек
               clearInputs()
               setTimeout(() => {
                  statusMessage.remove()
                  // закрываем модалку после отправки
                  if (item.closest('[data-modal]')) {
                     item.closest('[data-modal]').style.display = 'none'
                     document.body.classList.remove('modal-open')
                  }
               }, 5000)
               // очистка состояния после отправки калькулятора
               if (item.getAttribute('data-calc') === 'end') {
                  state = {}
               }
               console.log('---', state)
            })
      })
   })
}