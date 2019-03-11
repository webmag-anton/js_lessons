
																					/*** Замыкания, область видимости ***/


// // var currentCount = 1;  // глобальный счетчик

// function first() {
// 	var currentCount = 1;  // локальный счетчик                     

// 	return function() {
// 		return currentCount++
// 	}
// }

// var counter = first();
// var counter2 = first();

// alert( counter() );
// alert( counter() );
// alert( counter() );

// // Счетчики независимы, потому что при каждом запуске first создаётся свой объект 
// // переменных LexicalEnvironment, со своим свойством currentCount!!!
// alert( counter2() ); 





// Счетчик использует св-во функции (т.к. функции являются объектами). 
// Сва-ва ф-ии не связаны с аргументами и переменными.
// function makeCounter() {
//   function counter() {
//     return counter.currentCount++;
//   };
//   counter.currentCount = 1;

//   return counter;
// }

// var counter = makeCounter();
// alert( counter() ); // 1
// alert( counter() ); // 2
// counter.currentCount = 5;
// alert( counter() ); // 5





// say('Вася'); // к моменту вызова в глоб-м объекте window пер-я phrase undefined (window.phrase === undefined ) 
// var phrase = 'Привет';
// say('Вася');

// function say(name) {
//   alert( name + ", " + phrase );
// }





// var value = 0;

// function f() {
//   if (1) {
//     value = true;
//   } else {
//     var value = false;
//   }

//   alert( value );
// }

// f();
// // внешняя переменная не изменится, т.к lexicalEnviroment( внутренний объект ф-ии f ) увидет переменную
// // внутри else, а в if присвоет ей значение true. А если бы в else отсутствовала 'var', то ф-я f 
// // нашла внешнюю переменную value и перезаписала бы ее !!!
// alert( value );





// Вызов на месте
// var a = 5;
// (function() {
//   alert(a)
// }) ()





// Чтобы добавить счётчику возможностей – перейдём с функции на полноценный объект:

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





// function sum(a) {
// 	return function(b) {
// 		return a+b;
// 	}
// }
// alert( sum(5)(6) );  





// function makeBuffer() { 

// 	var string = '';

// 	function concatination(value) {

// 		if (arguments.length != 0) {
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
//     if ( func(val) ) {
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



											// или так 



// function makeArmy() {

//   var shooters = [];

//   for (var i = 0; i < 10; i++) {

//     var shooter = function me() { 
//       alert( me.num ); // самообращение внутри себя - только с помощью NFE !
//     };

//     shooter.num = i;

//     shooters.push(shooter);

//   }

//   return shooters;
// }

// var army = makeArmy();
// army[0](); 
// army[5](); 