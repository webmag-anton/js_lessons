                 

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
// 		date = new Date( date );
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