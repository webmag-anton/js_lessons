/* null - значение неизвестно;   undefined - значение не присвоено */
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





// alert( alert(1) || 2 || alert(3) );  // Ответ: сначала 1, затем 2.
// Вызов alert не возвращает значения, или, иначе говоря, возвращает undefined.
// Выполнит первый alert(1), получит undefined и пойдёт дальше, ко второму операнду.





/* Преобразование типов для примитивов: Строковое, Численное, Логическое (|| (ИЛИ), && (И) и ! (НЕ)) */

// "" + 1 + 0            "10"
// "" - 1 + 0						 -1	
// true + false					 1
// 6 / "3"							 2
// "2" * "3"						 6
// 4 + 5 + "px"					 "9px"
// "$" + 4 + 5					 "$45"
// "4" - 2							 2
// "4px" - 2						 NaN
// 7 / 0							   Infinity
// "  -9\n" + 5					 "  -9\n5"
// "  -9\n" - 5					 -14
// 5 && 2								 2
// 2 && 5								 5
// 5 || 0								 5
// 0 || 5								 5
// null + 1							 1
// undefined + 1				 NaN
// null == "\n0\n"       false
// +null == +"\n0\n"	   true





// do {
// 	var question = prompt('введите число больше 100', 78);
// } while ( question < 101 && question != null )





// nextPrime:
//   for (var i = 2; i <= 10; i++) {

//     for (var j = 2; j < i; j++) {
//       if (i % j == 0) continue nextPrime;
//     }

//     alert( i ); // простые числа до 10 (2,3,5,7)
//   }





// Конструкция свитч проверяет на строгое равенство! (===) 
// var arg = prompt("Введите arg?")
// switch (arg) {
//   case '0':
//   case '1':
//     alert( 'Один или ноль' );

//   case '2':
//     alert( 'Два' );
//     break;

//   case 3:
//     alert( 'Никогда не выполнится' );

//   default:
//     alert('Неизвестное значение: ' + arg)
// }





/* Если return; вызван без значения, или функция завершилась без return, то её результат равен undefined */

// function checkAge(age) {
//   if (age > 18) {
//     return true;
//   } else {
//     return confirm('Родители разрешили?');
//   }
// }

// function checkAge(age) {
// 	return (age > 18) ? true : confirm('Родители разрешили?');
// }

// function checkAge(age) {
//   return (age > 18) || confirm('Родители разрешили?');
// }





// function pow(x,n) {
// 	var result = x;

// 	for (i = 1; i < n; i++) {
// 		result *= x; 
// 	}

// 	alert(result);
// }
// pow(3,4);