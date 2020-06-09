export default function timer(expiresDate) {
   const days = document.querySelector('#days'),
         hours = document.querySelector('#hours'),
         minutes = document.querySelector('#minutes'),
         seconds = document.querySelector('#seconds'),
         expiresStamp = Date.parse(expiresDate)

   let secondsDiff = Math.round((expiresStamp - Date.now()) / 1000)

   function renderTimer() {
      const minutesDiff = secondsDiff / 60
      const hoursDiff = secondsDiff / (60 * 60)
      const daysDiff = secondsDiff / (60 * 60 * 24)

      let secondsLeft = secondsDiff % 60                      // секунды разбиваем на минуты
      let minutesLeft = Math.floor(minutesDiff % 60)          // минуты разбиваем на часы
      let hoursLeft = Math.floor(hoursDiff % 24)              // часы разбиваем на дни
      let daysLeft = Math.floor(daysDiff)                     // дни

      if (secondsDiff < 0) {
         daysLeft = 0 
         hoursLeft = 0 
         minutesLeft = 0 
         secondsLeft = 0 
      }

      days.innerHTML = daysLeft < 10 ? '0' + daysLeft : daysLeft
      hours.innerHTML = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft
      minutes.innerHTML = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft
      seconds.innerHTML = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft
   }

   renderTimer()

   const interval = setInterval(() => {
      secondsDiff = Math.round((expiresStamp - Date.now()) / 1000)

      if (secondsDiff < 0) {
         clearInterval(interval) 
      } 

      renderTimer()
   }, 1000)
}