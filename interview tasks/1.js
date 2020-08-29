// 1) какие типы данных есть в JavaScript

// 2) что выведет

// console.log(typeof null);

// 3) Есть матрица

// [ 
//   [1, 4, 8, 9,],
//   [6, 2, 11, 1,],
//   [8, 0, 3, -5,],
//   [-2, 10, 8, 1]
// ]

// Вывести на экран числа, находящиеся под главной диагональю матрицы


// 4) Развернуть одномерный массив без создания дополнительного массива

// 5) Что получится в результате

// "1" + 2; 
// 1 + "2"; 

// 6) Что выдаст результат сравнения

// var a = {
//     name : 'test'
// }

// var b = { 
//     name : 'test'
// }

// a == b
// a === b

// 7)

// let s = 'Hello';
// const F = a => {   
//   a = 'Ura-a-a-h';
// };
// F(s);
// console.log(s);


// 8)

// const o = { s: 'Hello' };
// const G = obj => {  
//    obj.s = 'Ura-a-a-h';
// };
// G(o);
// console.log(o.s);






								// Решения


								// 3)

// let matrix = [ 
//   [1,  4,  8,  9,],
//   [6,  2,  11, 1,],
//   [8,  0,  3,  -5,],
//   [-2, 10, 8,  1]
// ];

// for (let row = 1; row < matrix.length; row++) {

// 	for (let elem = 0; elem < row; elem++) {
// 		console.log(matrix[row][elem]); 
// 	};

// };

	//или

// matrix.forEach(function(row, outerIndex) {
// 	row.forEach(function(elem, innerIndex) {
// 		if(innerIndex < outerIndex) {
// 			console.log(elem)
// 		} else return;
// 	});
// });




							// 4)

// const arr = [-2, 10, 8, 1];

// for (let i = arr.length - 1; i >= 0; i--) {
// 	arr.push(arr[i]);
// };

// arr.splice(0, arr.length / 2);

// console.log(arr);





							// 7)

// 'Hello', т.к. мы выводим значение во внешней области видимости, где локальная пер-я ф-ии не видна

// let s = 'Hello';
// const F = s => {   
// 	console.log(s);	 // 'Hello'. Если вызвать без значения то undefined, а со значением происходит присвоение
//   s = 'Ura-a-a-h'; // поменялось из 'Hello' в 'Ura-a-a-h'
//   console.log(s);  // 'Ura-a-a-h'
// };
// F(s);
// console.log(s);





							// 8)

// 'Ura-a-a-h', т.к. ссылочный тип данных

// const o = { s: 'Hello' };
// const G = obj => {  
//    obj.s = 'Ura-a-a-h';
// };
// G(o);
// console.log(o.s);









								// заметка 1

// При создании ф-ии параметры копируются в локальные переменные функции.
// Передаваемые значения копируются в параметры функции и становятся локальными переменными.

// 'use string';

// let str = 'hello';

// function f(str) {
//    //str = 'bye';

//    console.log(str);
// };

// f(str);

// console.log(str);






								// заметка 2

// Функция навсегда запоминает ссылку на лексическое окружение, где она была создана

// function Counter() {
//   let count = 0;

//   this.up = function() {
//     return ++count;
//   };
// }

// let counter = new Counter(); // в экземпляре нет св-ва count

// alert( counter.up() ); // 1






								// заметка 3

// В ссылочных типах данных (объекты, массивы, ф-ии) присвоение, копирование
// и сравнение осуществляется по ссылке (ключу)!!!  а в примитивах по значению

// var arr = [1,2,3,4,5];
// var newArr = arr;
// arr.shift();
// console.log(newArr);


// // а здесь


// var arr = [1,2,3,4,5];
// var newArr = arr;
// arr = 0;
// console.log(newArr);

// В первом случае вносятся изменения в объект arr, соответсвенно, раз в 
// newArr хранится ссылка на объект arr, то и newArr меняется. Во втором 
// переменной arr просто присваивается новое значение.









								// Замыкание (closure)

// // ф-я closure замыкает в себе переменную a
// function closure(a) {
//   // возвращаемая ф-я замыкается на переменную а, и наоборот (никто  
//   // кроме нее не имеет доступа к переменной)
//   return function() { 
//     a++;
//     console.log(a)
//   }
// }

// let counter = closure(0);
// counter()
// counter()
// console.log(a) // a не видно, вызов ф-ии counter не меняет область видимости



	




								// this у стрелочных функций

// у стрелочных функций нет своего контекста (this); если мы используем this внутри 
// стрелочной функции, то его значение берётся из внешней «нормальной» функции
// let group = {
//   title: "Our Group",
//   students: ["John", "Pete", "Alice"],

//   showList() {
//     this.students.forEach(
//       student => alert(this.title + ': ' + student)  // this берется из ближашей нестрелочной ф-ии (метода showList) 

//       // обычная ф-я не сработает, т.к. у нее потерян контекст
//       // function(student) { alert(this.title + ': ' + student) } 
//     );
//   }
// };
// group.showList();