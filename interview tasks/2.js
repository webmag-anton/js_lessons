// 1) есть массив чисел. Найдите максимальное
// 2) что выведет в консоль

// for (var i = 0; i < 3; i++) {
// setTimeout(function () {
// console.log(i);
// }, 0);
// }

// как это поправить?

// 3) есть список строк. Найти строки, которые являются палиндромами



              

              // 1)

// let arr = [2, 28, -5, 1, 7];

// 1 способ
// console.log( Math.max(...arr) );

// 2 способ
// console.log( Math.max.apply(null, arr) );

// 3 способ
// let max = arr[0];
// for (i=1; i<arr.length; i++) {
// 	if (arr[i] > max) {
// 		max = arr[i];
// 	}
// };
// console.log(max);






              // 3)

// 'use strict';

// const strings = ['abc', 'bce', 'aba', 'bbb'];

// strings.forEach(function(string) {
// 	let reversed = "";

// 	for (let i = string.length - 1; i >= 0; i--) {
// 		reversed += string[i];
// 	};

// 	if (string === reversed) {
// 		console.log(`${string} is polindrom`);
// 	};
// });








									// Бинарный поиск

// let arr = [4, 15, 18, 65, 94, 100, 254, 321, 365, 405, 424, 429, 542, 823];

// function BinarySearch(t, A)      // t - искомый элемент
// {                                // A - упорядоченный массив, в котором ищем
//   var i = 0, 										 // i - индекс
//   		j = A.length, 						 // j - длина массива
//   		k; 												 // k - середина массива 
                               
//   while (i < j) {                // пока индекс < длина массива, то
//     k = Math.floor((i+j)/2);		 // вычисляем середину массива начиная с индекса 0

//     if (t <= A[k]) {						 // и если искомый элемент <= среднему эллементу массива
//      	j = k;										 // то длина массива равна половине длины
//     }	else {
//     	i = k+1;									 // а иначе вычисляем середину массива начиная со 2й половины
//     }
//   }

//   if (A[i] === t) return i;      // На выходе индекс искомого элемента
//   else return -1;                // Если искомого элемента нет в массиве, то -1
// }

// var q = BinarySearch(429, arr);

// console.log(q);