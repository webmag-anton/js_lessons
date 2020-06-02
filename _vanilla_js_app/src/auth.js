export function getAuthFormHTML() {
   return `
      <form id='auth-form' class='mui-form'>
         <div class='mui-textfield mui-textfield--float-label'>
            <input id='email' type='email' required>
            <label for='email'>Email</label>
         </div>
         <div class='mui-textfield mui-textfield--float-label'>
            <input id='password' type='password' required>
            <label for='password'>Пароль</label>
         </div>
         <button 
            type='submit' 
            class='mui-btn mui-btn--raised mui-btn--primary'
         >
            Войти
         </button>
      </form>
   `
}

export function authWithEmailAndPassword(email, password) {
   const apiKey = `AIzaSyBEwqd2mNevEkv6AKAN5Vj73TfrUeltaBE` // берем в Firebase в настройках проекта
   return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
         email, 
         password,
         returnSecureToken: true
      }),
      headers: {
         'Content-Type': 'application/json'
      }
   })
   .then(response => response.json())
   .then(data => data.idToken)
}