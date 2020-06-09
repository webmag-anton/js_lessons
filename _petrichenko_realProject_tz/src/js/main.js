import './slider'
import modals from './modules/modals'
import tabs from './modules/tabs'
import forms from './modules/forms'
import changeModalState from './modules/changeModalState'
import timer from './modules/timer'


document.addEventListener('DOMContentLoaded', () => {

   let modalState = {}

   modals()
   tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active')   // ТЗ № 5
   tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click')   // ТЗ № 7
   forms(modalState)   // ТЗ № 7

   tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')

   changeModalState(modalState)

   timer('06.30.2020')  // mm.dd.yy
})