
																	/*** Структуры данных ***/



// Сложение цен
// var price1 = 0.1;
// var price2 = 0.2;
// var sum =  +(price1 + price2).toFixed(2) ;
// alert( sum );





// Случайное из интервала (min, max)
// var min = 5,
//   	max = 10;
// alert( min + Math.random() * (max - min) );




// Случайное целое от min до max
// function randomInteger(min, max) {
//   var rand = min - 0.5 + Math.random() * (max - min + 1)
//   rand = Math.round(rand);
//   return rand;
// }
// alert( randomInteger(5, 10) );





// function checkSpam(str) {
// 	var strLower = str.toLowerCase();

// 	if( strLower.indexOf('viagra') != -1 || strLower.indexOf('xxx') != -1 ) {
// 		return true;
// 	}
// 	return false;
// }
// alert(checkSpam('buy ViAgRA now'));





// function truncate(str, maxlength) {
//   if (str.length > maxlength) {
//     return str.slice(0, maxlength - 3) + '...';
//   }

//   return str;
// }
// alert( truncate("Вот, что мне хотелось бы сказать на эту тему:", 20) );
// alert( truncate("Всем привет!", 20) );





// var salaries = {
//   "Вася": 100,
//   "Петя": 300,
//   "Даша": 250
// };

// function getSumSalaries(obj) {
// 	var sum = 0;

// 	for (var key in obj) {
// 		sum += obj[key];
// 	}

// 	return sum;
// }

// alert ( getSumSalaries(salaries) );





// var salaries = {
//   "Вася": 100,
//   "Петя": 300,
//   "Даша": 250
// };

// function getBiggestSalary(obj) {
// 	var biggestSalary = 0,
// 			name = '';

// 	for (var key in obj) {

// 		if (obj[key] > biggestSalary) {
// 			biggestSalary = obj[key];
// 			name = key;
// 		}

// 	}

// 	if (name == '') return 'нет сотрудников';
// 	return name;
// }

// alert( getBiggestSalary(salaries) );





// var menu = {
//   width: 200,
//   height: 300,
//   title: "My menu"
// };

// function multiplyNumeric(obj) {

// 	for( var key in obj ) {

// 		if( !isNaN(parseFloat(obj[key])) && isFinite(obj[key]) ) {
// 			obj[key] *= 2;
// 		}

// 	}

// 	return menu;

// }

// alert( multiplyNumeric(menu).height );





// var styles  = ['Джаз','Блюз'];
// styles.push('Рок-н-Ролл');
// styles[styles.length - 2] = 'Классика';
// alert( styles.shift() ); 
// styles.unshift('Рэп', 'Регги');





// var arr = ["Яблоко", "Апельсин", "Груша", "Лимон"];

// function getRandomEllement(arr) {
// 	var rand = Math.floor(Math.random() * arr.length);
// 	return arr[rand];
// }
// alert( getRandomEllement(arr) );





// var array = [];

// while(true) {

// 	var question = prompt('Введите число для суммы', 0);

// 	if( question === '' || isNaN(question) === true || question === null ) break;

// 	array.push(+question);

// }

// var sum = 0;

// for( var key in array ) {
// 	sum += array[key];
// }
// alert( 'Сумма введенных Вами чисел = ' + sum );





// arr = ["test", 2, 1.5, false];

// function find(arr, value) {

// 	for( i=0; i<arr.length; i++ ) {
// 		if( arr[i] === value ) return i;
// 	}

// 	return -1;

// }
// alert( find(arr, 1.5) );





// var array = [5, 4, 3, 8, 0];

// function filterRange(arr, min, max) {
// 	var newArr = [];

// 	for( i=0; i<arr.length; i++ ) {

// 		if( arr[i] >= min && arr[i] <= max ) {
// 			newArr.push(arr[i]);
// 		}

// 	}

// 	return newArr;
// }

// var filtered = filterRange(array, 3, 5);
// alert( filtered );





/* Задача – найти непрерывный подмассив arr, сумма элементов которого максимальна. */

// Медленное решение (перебор всех подмассивов)
// function getMaxSubSum(arr) {
//   var maxSum = 0; // если совсем не брать элементов, то сумма 0

//   for (var i = 0; i < arr.length; i++) {
//     var sumFixedStart = 0;
//     for (var j = i; j < arr.length; j++) {
//       sumFixedStart += arr[j];
//       maxSum = Math.max(maxSum, sumFixedStart);
//     }
//   }

//   return maxSum;
// }

// alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
// alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
// alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3


// Быстрое решение
// function getMaxSubSum(arr) {
//   var maxSum = 0,
//     partialSum = 0;
//   for (var i = 0; i < arr.length; i++) {
//     partialSum += arr[i];
//     maxSum = Math.max(maxSum, partialSum);
//     if (partialSum < 0) partialSum = 0;
//   }
//   return maxSum;
// }

// alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
// alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
// alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3





/*Добавить класс в строку*/
// var object = {
//   className: 'open menu'
// }

// function addClass(obj, cls) {

// 	var arr = obj.className.split(' ');

// 	for (var i=0; i<arr.length; i++) {
// 		if (arr[i] == cls) return;
// 	}

// 	arr.push(cls);
// 	obj.className = arr.join(' ');;
	
// }

// addClass(object, 'new');
// alert( object.className );





// function camelize(str) {

//   var arr = str.split('-');

//   for (i = 0; i < arr.length; i++) {
//   	arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1); 
//   }

//   return arr.join('');

// }
// alert( camelize("list-style-image") );





/*Фильтрация массива "на месте"*/
// function filterRangeInPlace(arr, a, b) {

//   for (var i = 0; i < arr.length; i++) {
//     var val = arr[i];
//     if (val < a || val > b) {
//       arr.splice(i--, 1);
//     }
//   }

// }

// var arr = [5, 3, 8, 1];

// filterRangeInPlace(arr, 1, 4);
// alert( arr );





// var arr = [1, -1, 2, -2, 3];

// var positiveArr = arr.filter(function(number) {
//   return number > 0;
// });

// alert( positiveArr ); // 1,2,3






// function getSums(arr) {
//   var result = [];
//   if (!arr.length) return result;

//   var totalSum = arr.reduce(function(sum, item) {
//     result.push(sum);
//     return sum + item;
//   });
//   result.push(totalSum);

//   return result;
// }

// alert(getSums([1,2,3,4,5])); // 1,3,6,10,15
// alert(getSums([-2,-1,0,1])); // -2,-3,-3,-2





/*копирование свойств copy(dst, src1, src2...) с помощью arguments*/

// function copy() {
//   var dst = arguments[0];

//   for (var i = 1; i < arguments.length; i++) {
//     var arg = arguments[i];
//     for (var key in arg) {
//       dst[key] = arg[key];
//     }
//   }

//   return dst;
// }

// var vasya = {
//   age: 21,
//   name: 'Вася',
//   surname: 'Петров'
// };

// var user = {
//   isAdmin: false,
//   isEmailConfirmed: true
// };

// var student = {
//   university: 'My university'
// };

// // добавить к vasya свойства из user и student
// copy(vasya, user, student);

// alert( vasya.isAdmin ); // false
// alert( vasya.university ); // My university




/* передача аргументов в объекте */
// function showWarning(options) {
//   var width = options.width || 200; // по умолчанию
//   var height = options.height || 100;
//   var contents = options.contents || "Предупреждение";
//   // ...
// }
// showWarning({
//   contents: "Вы вызвали функцию" // и всё понятно!
// });





// // выведите 1, если первый аргумент есть, и 0 - если нет
// function f(x) {
//   alert( arguments.length ? 1 : 0 );
// }

// f(undefined); // 1
// f(); // 0





/*Сумма аргументов*/
// function sum() {
// 	var sum = 0;

// 	for (i=0; i<arguments.length; i++) {
// 		sum += arguments[i];
// 	}

// 	alert( sum );
// }
// sum(1, 8, 3);





/* Дата и время */

// var date = new Date(2012, 0, 20, 3, 12);
// alert( date );





// var date = new Date();
// function getWeekDay(date) {
// 	var day = date.getDay();
// 	var days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
// 	return days[day];
// }
// alert( getWeekDay(date) );





// var date = new Date(2012, 0, 3);
// function getLocalDay(date) {
// 	var day = date.getDay();
// 	if ( day == 0 ) day = 7;
// 	return day;
// }
// alert(getLocalDay(date));





// var date = new Date(2015, 0, 2);

// function getDateAgo(date, days) {
//   var dateCopy = new Date(date);

//   dateCopy.setDate(date.getDate() - days);
//   return dateCopy.getDate();
// }
// alert( getDateAgo(date, 1) ); // 1, (1 января 2015)





// function getLastDayOfMonth(year, month) {
// 	var date = new Date(year, month + 1, 0);
// 	return date.getDate();
// }
// alert( getLastDayOfMonth(2012, 1) );





// Сколько секунд уже прошло сегодня?
// function getSecondsToday() {
// 	var msBeginDay = new Date().setHours(0,0,0);

// 	var msFromBegin = (Date.now() - msBeginDay) / 1000;

// 	return msFromBegin;
// }
// alert( getSecondsToday() )





// Сколько секунд - до завтра?
// function getSecondsToTomorrow() {
// 	var date = new Date();

// 	var dateTomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

// 	return Math.round((dateTomorrow - Date.now()) / 1000);

// }
// alert( getSecondsToTomorrow() );





// Вывести дату в формате дд.мм.гг
// var d = new Date(2014, 11, 3);

// function formatDate(date) {

// 	var dd = date.getDate();
// 	if ( dd < 10 ) dd = '0' + dd;

// 	var mm = date.getMonth() + 1; // т.к месяца начинаются с 0 
// 	if ( mm < 10 ) mm = '0' + mm;

// 	var yy = date.getFullYear();
// 	var yyStr = yy + ''; 
// 	yy = yyStr.slice(-2);

// 	return dd + '.' + mm + '.' + yy;

// }
// alert( formatDate(d) )