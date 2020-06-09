export default function checkNumInputs(selector) {
   const numInputs = document.querySelectorAll(selector)

   numInputs.forEach(item => {
      item.addEventListener('input', () => {
         item.value = item.value.replace(/\D/, '')
      })
   })
}