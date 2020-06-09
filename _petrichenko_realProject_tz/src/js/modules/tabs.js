// headerSelector - класс общего контейнера для табов, tabSelector - класс табов, 
// contentSelector - класс контентов, activeClass - класс активного таба (без точки), display - отображение контента
export default function tabs(headerSelector, tabSelector, contentSelector, activeClass, display = 'block') {

   const header = document.querySelector(headerSelector),
         tab = document.querySelectorAll(tabSelector),
         content = document.querySelectorAll(contentSelector)

   // скраваем все контенты и удаляем класс активности всем табам
   function hideTabContent() {
      content.forEach(item => {
         item.style.display = 'none'
      })

      tab.forEach(item => {
         item.classList.remove(activeClass)
      })
   }
   // показываем только тот контент, который соответствует по счету нажатому табу и добавляем класс активности табу
   function showTabContent(i = 0) {
      content[i].style.display = display
      tab[i].classList.add(activeClass)
   }

   // изначально показываем 1й таб
   hideTabContent()
   showTabContent()

   // логика клика на таб
   header.addEventListener('click', e => {
      const target = e.target
      // в replace меняем точку на пустую строку, т.к. contains() ищет класс без точки
      if ( target && // некоторые элементы не отдают св-во target или не поддерживают click
           (target.classList.contains(tabSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))
         ) {
         tab.forEach((item, i) => {
            if (target == item || target.parentNode == item) {
               hideTabContent()
               showTabContent(i)
            }
         })
      }
   })
}