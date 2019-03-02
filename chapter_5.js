
																					/*** Замыкания, область видимости ***/


// function first() {
// 	var currentCount = 1;                       

// 	return function() {
// 		return currentCount++
// 	}
// }

// var counter = first();

// alert( counter() );
// alert( counter() );






// // Чтобы добавить счётчику возможностей – перейдём с функции на полноценный объект:
// function makeCounter() {
//   var currentCount = 1;

//   return { // возвратим объект вместо функции
//     getNext: function() {
//       return currentCount++;
//     },

//     set: function(value) {
//       currentCount = value;
//     },

//     reset: function() {
//       currentCount = 1;
//     }
//   };
// }

// var counter = makeCounter();

// alert( counter['getNext']() ); // 1
// alert( counter.getNext() ); // 2
// counter.set(5);
// alert( counter.getNext() ); // 5
// alert( counter.getNext() ); // 6
// counter.reset(); // 1
// alert( counter.getNext() ); // 1







// function makeCounter() {
//   var currentCount = 1;

//   // возвращаемся к функции
//   function counter() {
//     return currentCount++;
//   }

//   // ...и добавляем ей методы!
//   counter.set = function(value) {
//     currentCount = value;
//   };

//   counter.reset = function() {
//     currentCount = 1;
//   };

//   return counter;
// }

// var counter = makeCounter();

// alert( counter() ); // 1
// alert( counter() ); // 2

// counter.set(5);
// alert( counter() ); // 5








// function sum(a) {
// 	return function(b) {
// 		return a+b;
// 	}
// }
// alert( sum(5)(6) );  







// function makeBuffer() { 

// 	var string = '';

// 	function concatination(value) {

// 		if (value !== undefined) {
// 			string += value;
// 		} else {
// 			return string;
// 		}
// 	}

// 	// Делаем метод очистки с помощью св-ва ф-ии clear
// 	concatination.clear = function() {
// 		string = '';
// 	}

// 	return concatination;

// }

// var buffer = makeBuffer();

// // добавить значения к буферу
// buffer('Замыкания');
// buffer(' Использовать');
// buffer(' Нужно!');

// // получить текущее значение
// alert( buffer() ); // Замыкания Использовать Нужно!

// buffer.clear();

// buffer('Раз');
// buffer(' Два');
// alert( buffer() );







// var users = [{
//   name: "Вася",
//   surname: 'Иванов',
//   age: 20
// }, {
//   name: "Петя",
//   surname: 'Чапаев',
//   age: 25
// }, {
//   name: "Маша",
//   surname: 'Медведева',
//   age: 18
// }];

// function byField(value) {
// 	return function(a, b) {
// 		return a[value] > b[value] ? 1 : -1;
// 	}
// }

// users.sort(byField('name'));

// users.forEach(function(user) {
//   alert( user.name );
// }); // Вася, Маша, Петя








// function filter(arr, func) {
//   var result = [];

//   for (var i = 0; i < arr.length; i++) {
//     var val = arr[i];
//     if (func(val)) {
//       result.push(val);
//     }
//   }

//   return result;
// }

// var arr = [1, 2, 3, 4, 5, 6, 7];

// alert( filter(arr, function(a) {
//   return a % 2 == 0;
// }) ); // 2, 4, 6







// function filter(arr, func) {
// 	var result = [];

// 	for (var i = 0; i < arr.length; i++) {
// 		var val = arr[i];
// 		if ( func(val) ) {
// 			result.push(val);
// 		}
// 	}

// 	return result;
// }

// function inBetween(a, b) {
// 	return function(x) {
// 		return x >= a && x <= b;
// 	};
// }

// var arr = [1, 2, 3, 4, 5, 6, 7];
// alert( filter(arr, inBetween(3, 6)) ); // 3,4,5,6









// // Функция добавляет объекту LexicalEnvironment св-ва и присваевает переменные только при запуске!!! 
// // И когда не видет переменную внутри - ищет во внешнем объекте LexicalEnvironment, который  
// // на момент вызова i-го  стрелка army[..]()  имеет var i = 10 (после счетчика)

// function makeArmy() {

//   var shooters = [];

//   for (var i = 0; i < 10; i++) {
//     var shooter = function() { // функция-стрелок
//       alert( i );
//     };
//     shooters.push(shooter); // делает массив из функций (без их запуска)
//   }

//   return shooters;

//   // shooters = [

//   // 	function() { alert( i ) },
//   // 	function() { alert( i ) },
//   // 	function() { alert( i ) },
//   // 	function() { alert( i ) }...

//   // ]

// }

// var army = makeArmy();

// army[0](); // стрелок выводит 10, т.к. при запуске army[..]() LexicalEnvironment для makeArmy() имеет var i = 10
// army[5](); // стрелок выводит 10...
// // .. все стрелки выводят 10 вместо 0,1,2...9









// function makeArmy() {

//   var shooters = [];

//   for (var i = 0; i < 10; i++) {

//     var shooter = function(x) {

//       return function() {
//         alert( x );
//       };

//     }(i); // тут же выполняется, получая x = i. «на месте» разрешено вызывать только Function Expression

//     shooters.push(shooter);
//   }

//   return shooters;

//   // shooters = [
//   // 	function(x) { return function() {alert(x)} }(0),
//   // 	function(x) { return function() {alert(x)} }(1),
//   // 	function(x) { return function() {alert(x)} }(2),
//   // 	function(x) { return function() {alert(x)} }(3)...
//   // ]

// }

// var army = makeArmy();

// army[0](); // 0
// army[7](); // 7