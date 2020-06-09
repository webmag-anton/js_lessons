import checkNumInputs from './checkNumInputs'


// логика изменения состояния модалок c калькулятором при изменении контролов в них
export default function changeModalState(state) {

   const windowForm = document.querySelectorAll('.balcon_icons_img'),  
         windowWidth = document.querySelectorAll('#width'),
         windowHeight = document.querySelectorAll('#height'),
         windowType = document.querySelectorAll('#view_type'),
         windowProfile = document.querySelectorAll('.checkbox')

   // в поля ширина и высота можно вводить только цифры
   checkNumInputs('#width')      
   checkNumInputs('#height')      

   // event - событие, elem - контрол(ы) формы, записываемое свойство в стейт при событии у контрола
   function bindActionToElem(event, elem, prop) {

      elem.forEach((item, i) => {
         item.addEventListener(event, () => {
            // // если несколько элементов в контроле (форма балкона, тип 
            // // остекления, профиль остекления), то записываем номер выбранного
            // if (elem.length > 1) {
            //    state[prop] = i
            // } 
            // // если один элемент (ширина, высота), то записываем его значение
            // else {
            //    state[prop] = item.value
            // }
            // console.log('---', state) 

                           // или

            switch (item.nodeName) {
               case 'SPAN':
                  state[prop] = i
                  break
               case 'INPUT':
                  if (item.getAttribute('type') === 'checkbox') {
                     i == 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое'
                     // что бы не менять на type="radio" вместо type="checkbox" делаем проверку:  
                     // можно выбрать только один checkbox, поэтому 
                     // убираем checked у всех, кроме того, на который нажали
                     elem.forEach((box, j) => {
                        box.checked = false
                        if (i == j) {
                           box.checked = true
                        }
                     })
                  } 
                  else {
                     state[prop] = item.value
                  }
                  break
               case 'SELECT':
                  state[prop] = item.value
                  break
            }

            console.log('---', state) 
         })
      })
   }

   // 1. заносим в state форму балкона при клике (span)
   bindActionToElem('click', windowForm, 'form')
   // 2. заносим в state ширину при вводе (input)
   bindActionToElem('input', windowWidth, 'width')
   // 3. заносим в state высоту при вводе (input)
   bindActionToElem('input', windowHeight, 'height')
   // 4. заносим в state тип остекления (select)
   bindActionToElem('change', windowType, 'type')
   // 5. заносим в state тип остекления (checkbox)
   bindActionToElem('change', windowProfile, 'profile')
}