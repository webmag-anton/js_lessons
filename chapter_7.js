                 

                		/***   Некоторые другие возможности   ***/



			// 7.1  Типы данных: [[Class]], instanceof и утки


// var toString = {}.toString;

// var arr = [1, 2];
// alert( toString.call(arr) ); // [object Array]

// var date = new Date;
// alert( toString.call(date) ); // [object Date]

// var user = { name: "Вася" };
// alert( toString.call(user) ); // [object Object]

// alert( {}.toString.call(123) ); // [object Number]
// alert( {}.toString.call("строка") ); // [object String]



		// Метод Array.isArray()

// alert( Array.isArray([1,2,3]) ); // true
// alert( Array.isArray("not array")); // false





		// Утиная типизация

// var something = [1, 2, 3];

// if (something.splice) {
//   alert( 'Это утка! То есть, массив!' );
// }



// var x = new Date();

// if (x.getTime) {
//   alert( 'Дата!' );
//   alert( x.getTime() ); // работаем с датой
// }






// function sayHi(who) {

//   if (Array.isArray(who)) {
//     who.forEach(sayHi);
//   } else {
//     alert( 'Привет, ' + who );
//   }
// }

// // Вызов с примитивным аргументом
// sayHi("Вася"); // Привет, Вася

// // Вызов с массивом
// sayHi(["Саша", "Петя"]); // Привет, Саша... Петя

// // Вызов с вложенными массивами - тоже работает!
// sayHi(["Саша", "Петя", ["Маша", "Юля"]]); // Привет Саша..Петя..Маша..Юля


// 	// или


// function sayHi(who) {

//   if (who.forEach) {  // если есть forEach
//     who.forEach(sayHi); // предполагаем, что он ведёт себя "как надо"
//   } else {
//     alert( 'Привет, ' + who );
//   }
// }








// function formatDate(date) {

// 	var date;

// 	if (typeof date == 'string') {
// 		date = new Date( Date.parse(date) );
// 	} else if (typeof date == 'number') {
// 		date = new Date( date );
// 	} else if ( date.forEach ) {

// 		if ( date[1] == 0 ) date[1] = '01';
// 		if ( date[2] == 0 ) date[2] = '01';

// 		if ( date[1].toString().length < 2 ) date[1] = '0' + date[1];
// 		if ( date[2].toString().length < 2 ) date[2] = '0' + date[2];

// 		var string = date[0] + '-' + date[1] + '-' + date[2];
// 		date = new Date( Date.parse( string ) );

// 	} else if ( date.getDate ) {
// 		date = new Date( +date );
// 	}

// 	var y = date.getFullYear().toString().slice(2);
// 	var m = date.getMonth() + 1;
// 	var d = date.getDate();

// 	if ( d.toString().length < 2 ) d = '0' + d;
// 	if ( m.toString().length < 2 ) m = '0' + m;

// 	alert(d + '.' + m + '.' + y);

// }

// formatDate(new Date(2014, 0, 1));


// // alert( formatDate('2011-10-02') ); // 02.10.11
// // alert( formatDate(1234567890) ); // 14.02.09
// // alert( formatDate([2014, 0, 1]) ); // 01.01.14
// // alert( formatDate(new Date(2014, 0, 1)) ); // 01.01.14





			// 7.2  Формат JSON, метод toJSON


// var user = '{ "name": "Вася", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
// user = JSON.parse(user);
// alert( user.friends[1] );





// var str = '{"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}';

// var event = JSON.parse(str, function(key, value) {
//   if (key == 'date') return new Date(value);
//   return value;
// });

// alert( event.date.getDate() ); // теперь сработает!







// var event = {
//   title: "Конференция",
//   date: "сегодня"
// };

// var str = JSON.stringify(event);
// alert( str ); // {"title":"Конференция","date":"сегодня"}








// var room = {
//   number: 23,
//   occupy: function() {
//     alert( this.number );
//   }
// };

// var event = {
//   title: "Конференция",
//   date: new Date(Date.UTC(2014, 0, 1)),
//   room: room
// };

// alert( JSON.stringify(event) );
// /*
//   {
//     "title":"Конференция",
//     "date":"2014-01-01T00:00:00.000Z",  
//     "room": {"number":23}               
//   }
// */








// var room = {
//   number: 23,
//   toJSON: function() {
//       return this.number;
//     }
// };

// alert( JSON.stringify(room) ); // 23








// var user = {
//   name: "Вася",
//   age: 25,
//   roles: {
//     isAdmin: false,
//     isEditor: true
//   }
// };

// var str = JSON.stringify(user, "", 0);
// alert( str );








// var leader = {
//   name: "Василий Иванович",
//   age: 35
// };

// var stringify = JSON.stringify(leader);
// var obj = JSON.parse(stringify);






			// 7.3 setTimeout и setInterval



// // начать повторы с интервалом 3 сек
// var timerId = setInterval(function() {
//   alert( "тик" );
// }, 3000);

// // через 10 сек остановить повторы
// setTimeout(function() {
//   clearInterval(timerId);
//   alert( 'стоп' );
// }, 10000);





// // Рекурсивный setTimeout
// var timerId = setTimeout(function tick() {
//   alert( "тик" );
//   setTimeout(tick, 2000);
// }, 2000);







// function printNumbersInterval() {
//   var i = 1;
//   var timerId = setInterval(function() {
//     console.log(i);
//     if (i == 20) clearInterval(timerId);
//     i++;
//   }, 100);
// }

// printNumbersInterval();







// function printNumbersInterval() {
// 	var i = 1;
// 	setTimeout(function doLog() {
// 		console.log(i);
// 		i++;
// 		if (i < 21) setTimeout(doLog, 1000); 
// 	}, 1000);
// }

// printNumbersInterval()








// setTimeout(function() {
//   alert( i );
// }, 100);

// alert('some1')
// var i;

// function hardWork() {
//   // время выполнения этого кода >100 мс, сам код неважен
//   for (i = 0; i < 1e8; i++) hardWork[i % 2] = i;
//   alert('some2')
// }

// hardWork();









// var i;
// var timer = setInterval(function() { // планируем setInterval каждые 10 мс
//   i++;
// }, 10);

// setTimeout(function() { // через 50 мс - отмена setInterval
//   clearInterval(timer);
//   alert( i ); // (*)
// }, 50);

// // и запускаем тяжёлую функцию
// function f() {
//   // точное время выполнения не играет роли
//   // здесь оно заведомо больше 100 мс
//   for (i = 0; i < 1e8; i++) f[i % 2] = i;
// }

// f();

// // 1. Интерпретатор видит две отстрочки и идет дальше (во время отстрочки) выполнять ф-ю f
// // 2. После выполнения f, которое занимает > 100мс, очередь выполнеия переходит к первой в 
// // очереди - setInterval, которая давно готова. 
// // 3. После того как выполнилась ф-я setInterval первый раз, происходит отсрочка, во время
// // которой очередь выполнения переходит так же к давно готовая setTimeout, в которой 
// // удаляется setInterval







// function delay(f, ms) {

//   return function() {
//     var savedThis = this;
//     var savedArgs = arguments;

//     setTimeout(function() {
//       f.apply(savedThis, savedArgs);
//     }, ms);
//   };

// }

// function f(x) {
//   alert( x );
// }

// var f1000 = delay(f, 1000);
// var f1500 = delay(f, 1500);

// f1000("тест"); // выведет "тест" через 1000 миллисекунд
// f1500("тест2"); // выведет "тест2" через 1500 миллисекунд