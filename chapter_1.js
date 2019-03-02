// alert(null == null);  //true
// alert(undefined == undefined);  //true
// alert(null == undefined);  //true




// var login = prompt('Ваш логин','Админ');

// if (login == 'Админ') {

// 	var password = prompt('Ваш пароль','Чёрный Властелин')
// 	if (password == 'Чёрный Властелин') {
// 		alert('Добро пожаловать!');
// 	} else if (password == null) {
// 		alert('Вход отменён');
// 	} else {
// 		alert('Пароль неверен');
// 	}

// } else if (login == null) {
// 	alert('Вход отменён');
// }	else{
// 	alert('Я вас не знаю');
// }




// var message;

// if (login == 'Вася') {
//   message = 'Привет';
// } else if (login == 'Директор') {
//   message = 'Здравствуйте';
// } else if (login == '') {
//   message = 'Нет логина';
// } else {
//   message = '';
// }
// var message = (login == 'Вася') ? 'Привет' : 
// 							(login == 'Директор') ? 'Здравствуйте' :
// 							(login == '') ? 'Нет логина' : 
// 							'';




alert( alert(1) || 2 || alert(3) );  // Ответ: сначала 1, затем 2.
Вызов alert не возвращает значения, или, иначе говоря, возвращает undefined.
Выполнит первый alert(1), получит undefined и пойдёт дальше, ко второму операнду.