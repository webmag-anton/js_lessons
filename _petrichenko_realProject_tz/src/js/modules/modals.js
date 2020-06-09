// создание модалок
export default function modals() {
   // привязка окна (modalSelector) к определенному триггеру и его закрытие по крестику (closeSelector)
   // closeClickOverlay - щакрытие при клике на подложку
   function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

      const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),  // все модалки
            scroll = calcScroll()

      trigger.forEach(item => {
         item.addEventListener('click', e => {
            if (e.target) { // некоторые элементы не отдают св-во target или не поддерживают click
               e.preventDefault()
            }

            // в калькуляторе закрываем все модалки перед открытием следующей
            windows.forEach(item => {
               item.style.display = 'none'
            })

            modal.style.display = 'block'
            document.body.classList.add('modal-open')  // функционал уже стоявшего bootstrap (вместо overflow = 'hidden')
            document.body.style.marginRight = `${scroll}px`
         })
      })

      close.addEventListener('click', () => {
         modal.style.display = 'none'
         document.body.classList.remove('modal-open')
         document.body.style.marginRight = '0px'
      })

      modal.addEventListener('click', e => {
         // если кликнули на подложку, а не на саму модалку (внутри подложки), то закрываем
         if (e.target === modal && closeClickOverlay) { 
            modal.style.display = 'none'
            document.body.classList.remove('modal-open')
            document.body.style.marginRight = '0px'
         }
      })
   }

   function showModalInExactTime(modalSelector, time) {
      setTimeout(() => {
         // если не открыта какая то модалка, то через 60 секунд показываем модалку .popup
         if (!document.body.classList.contains('modal-open')) {
            const modal = document.querySelector(modalSelector)
            modal.style.display = 'block'
            document.body.classList.add('modal-open')
            document.body.style.marginRight = `${scroll}px`
         }
      }, time)  
   }

   // вычисляем ширину scroll-bar
   function calcScroll() {
      let div = document.createElement('div')

      div.style.width = '50px'
      div.style.height = '50px'
      div.style.overflowY = 'scroll'
      div.style.visibility = 'hidden'

      document.body.appendChild(div)
      let scrollWidth = div.offsetWidth - div.clientWidth
      div.remove()

      return scrollWidth
   }

   bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')  // ТЗ № 1
   bindModal('.phone_link', '.popup', '.popup .popup_close')  // ТЗ № 2
   showModalInExactTime('.popup', 60000) // ТЗ № 10

   bindModal('.popup_calc_btn', '.popup_calc ', '.popup_calc_close')
   bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false)
   bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)
}