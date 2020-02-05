'use strict';


				/***** intresting moments *****/


// // при встроенном объявлении переменной var видна снаружи, а let нет
// for (var i = 0; i < 10; i++) {}
// console.log(i)


// function doNothing() {};  
// console.log( doNothing() ); // undefined


// var a = {
// 	name : 'test'
// }
// var b = { 
// 	name : 'test'
// }
// console.log( a == b, a === b ); // false false


// console.log( '1' + 2,  1 + '2' ); // '12' '12'


// let s = 'Hello';
// const F = a => {   
//   a = 'Ura-a-a-h';
// };
// F(s);
// console.log(s); // Hello


// const o = { s: 'Hello' };
// const G = obj => {  
//    obj.s = 'Ura-a-a-h';
// };
// G(o);
// console.log(o.s); // Ura-a-a-h


// // Развернуть одномерный массив без создания дополнительного массива
// const arr = [-2, 10, 8, 1];
// for (let i = arr.length - 1; i >= 0; i--) {
// 	arr.push(arr[i]);
// };
// arr.splice(0, arr.length / 2);
// console.log(arr);


// for (var i = 0; i < 3; i++) {
// 	setTimeout(function () {
// 		console.log(i);
// 	}, 900);
// }
// // 2 решения
// for (let i = 0; i < 3; i++) { // у каждого цикла своё собственное  
// 	setTimeout(function () {    // лексическое окружение со своей переменной 
// 		console.log(i);
// 	}, 900);
// }
// // или
// for (var i = 0; i < 3; i++) {
// 	(function(j) { // ф-я замыкает в себе переменную
// 		setTimeout( function() {
// 			console.log(j);
// 		}, 900)
// 	})(i) // immediately-invoked function expressions 
// }



								// заметка 1

// // Функция навсегда запоминает ссылку на лексическое окружение, где она была создана
// function Counter() {
//   let count = 0;
//   this.up = function() {
//     return ++count;
//   };
// }
// let counter = new Counter(); // в экземпляре нет св-ва count
// console.log( counter.up() ); // 1



								// заметка 2 - Замыкание (closure)

// // ф-я closure замыкает в себе переменную a
// function closure(a) {
//   // возвращаемая ф-я замыкается на переменную а, и наоборот (никто  
//   // кроме нее не имеет доступа к переменной)
//   return function() { 
//     a++;
//     console.log(a)
//   }
// }
// let counter = closure(0); // каждый новый вызов создает свое lexical enviroment
// counter() // 1
// counter() // 2
// console.log(a) // a не видно, вызов ф-ии counter не меняет область видимости



								// заметка 3 - у стрелочных функций нет своего контекста (значения this)

// // значение this внутри стрелочной функции берётся из внешней «нормальной» функции
// let group = {
//   title: "Our Group",
//   students: ["John", "Pete", "Alice"],
//   showList() {
//     this.students.forEach(
//       student => alert(this.title + ': ' + student) // в node.js нет alert

//       // обычная ф-я не сработает, т.к. this указывает на window, у которого вызывается 
//       // метод alert ( alert это сокращение от window.alert() ), а для глобального
//       // объекта мы не объявляли св-во title и не создавали var title в глобальной области
//       // function(student) { alert(this.title + ': ' + student) } 
//     );
//   }
// };
// group.showList();


// arr.forEach( function() { console.log(this) } )  // undefined, в callback this не определен
// arr.forEach( () => { console.log(this) } )  // значение this родительской ф-ии (в глобальной 
// 																						// области видимости - window) 
// elem.addEventListener('click', function() { console.log(this) } ) // внутри обработчика события 
// 																																	// this всегда ссылается на elem
// elem.addEventListener('click', e => { console.log(this) } )  // значение this родительской ф-ии (в 
// 																														 // глобальной области - window)



													// заметка 4

// console.log(this === window.console) - почему то this из метода log ссылается не на объект console, а на window


				/***** intresting moments END *****/






// let user = {
//   name: "John",
//   money: 1000,

//   [Symbol.toPrimitive](hint) {
//     alert(`hint: ${hint}`);
//     return hint == "string" ? `{name: "${this.name}"}` : this.money;
//   }
// };






// let salaries = {
//   "John": 100,
//   "Pete": 300,
//   "Mary": 250
// };


// function sumSalaries(obj) {
	
// 	let sum = 0;

// 	for (let salary of Object.values(obj)){
// 		sum += salary
// 	}

// 	return sum;
// }


// alert( sumSalaries(salaries) ); // 650



		// Деструктуризация в цикле for of

// let salaries = {
//   "John": 100,
//   "Pete": 300,
//   "Mary": 250
// };

// function topSalary(salaries) {

// 	let max = 0;
// 	let maxName = null;

// 	for (const [name, salary] of Object.entries(salaries)) {
// 		if (max < salary) {
// 			max = salary;
// 			maxName = name;
// 		}
// 	}

// 	return maxName;
// }





		/* функция стрелок */

// function makeArmy() {
//   let shooters = [];

//   let i = 0;
//   while (i < 10) {
//   	let y = i
//     let shooter = function() { // функция shooter
//       alert( y ); // должна выводить порядковый номер
//     };
//     shooters.push(shooter);
//     i++;
//   }

//   return shooters;
// }

// let army = makeArmy();

// army[0]();
// army[5](); 






			/* setTimeout */

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





			/* Декоратор шпион */

// function work(a, b) {
//   alert( a + b ); // произвольная функция или метод
// }

// function spy(func) {

// 	let arr = [];

// 	return function wrapper(...args) {
// 		wrapper.calls = arr;

// 		arr.push(args);

// 		return func(...args);
// 	}
// }

// work = spy(work);

// work(1, 2); // 3
// work(4, 5); // 9

// for (let args of work.calls) {
//   alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
// }




// Function.prototype.defer = function(ms) {

// 	let func = this;

// 	return function(...args) {

// 		return setTimeout(func.bind(null, ...args), ms) 
// 	}

// }

// function f(a, b) {
//   alert( a + b );
// }

// f.defer(1000)(1, 3); // выведет 3 через 1 секунду.







// let dictionary = Object.create(null);

// // ваш код, который добавляет метод dictionary.toString
// Object.defineProperty(dictionary, 'toString', {
// 	'value': function() {
// 		return Object.keys(this).join(',');
// 	},
// 	'writible': true,
// 	'configurable': true
// });

// // добавляем немного данных
// dictionary.apple = "Apple";
// dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ

// // только apple и __proto__ выведены в цикле
// for(let key in dictionary) {
//   alert(key); // "apple", затем "__proto__"
// }

// // ваш метод toString в действии
// alert(dictionary); // "apple,__proto__"







			/* 9.1 */

// class Clock{

// 	constructor({ template }){
// 		this.template = template;
// 	}

// 	render() {
// 		let date = new Date();

// 		let hours = date.getHours();
// 		if (hours < 10) hours = '0' + hours;

// 		let mins = date.getMinutes();
// 		if (mins < 10) mins = '0' + mins;

// 		let secs = date.getSeconds();
// 		if (secs < 10) secs = '0' + secs;

// 		let output = this.template
// 		.replace('h', hours)
// 		.replace('m', mins)
// 		.replace('s', secs);

// 		console.log(output);
// 	}

// 	stop() {
// 		clearInterval(this.timer);
// 	}

// 	start() {
// 		this.render();
// 		this.timer = setInterval( () => this.render() , 1000);
// 	}

// }

// let clock = new Clock({template: 'h:m:s'});
// clock.start();






			/* 9.2 */

// class Clock{

// 	constructor({ template }){
// 		this.template = template;
// 	}

// 	render() {
// 		let date = new Date();

// 		let hours = date.getHours();
// 		if (hours < 10) hours = '0' + hours;

// 		let mins = date.getMinutes();
// 		if (mins < 10) mins = '0' + mins;

// 		let secs = date.getSeconds();
// 		if (secs < 10) secs = '0' + secs;

// 		let output = this.template
// 		.replace('h', hours)
// 		.replace('m', mins)
// 		.replace('s', secs);

// 		console.log(output);
// 	}

// 	stop() {
// 		clearInterval(this.timer);
// 	}

// 	start() {
// 		this.render();
// 		this.timer = setInterval( () => this.render() , 1000);
// 	}

// }


// class ExtendedClock extends Clock {
//   constructor(options) {
//     super(options);
//     let { precision=1000 } = options;
//     this.precision = precision;
//   }

//   start() {
//     this.render();
//     this.timer = setInterval(() => this.render(), this.precision);
//   }
// };

// let clock = new ExtendedClock({template: 'h:m:s', precision: 3000});
// clock.start();





			/* обработка ошибок */

// function func() {
//   try {
//     return 1;
//   } catch (e) {
//     /* ... */
//   } finally {
//     alert( 'finally' );
//   }
// }
// alert( func() ); // сначала срабатывает alert из finally, а затем этот код



// try{
// 	alert(some) 
// } catch (e) {
// 	console.log(e.name); 
// }
// alert("test")





			/* 11.2  промисы */


// function delay(ms) {
//   return new Promise((resolve, reject) => {
//   	setTimeout( () => resolve('готово'), ms)
//   })
// }

// delay(2000).then((val) => alert(val + ' =)'));

// console.log('сначала синхронный код');




// console.log('start');

// // Т.к обработчики промисов then, catch, finally асинхронны, то
// // они выполняются после синхронных скриптов и в порядке очереди
// const promise_200 = new Promise ((resolve,  reject) => {
// 	setTimeout( () => { resolve('resolve_200') }, 200)
// })
// .then( (val) => console.log(val) );

// const promise_100 = new Promise ((resolve,  reject) => {
// 	setTimeout( () => { resolve('resolve_100') }, 100)
// })
// .then( (val) => console.log(val) );

// // тяжёлая функция
// function f() {
//   for (let i = 0; i < 1e9; i++) f[i % 2] = i;
// }
// f();

// console.log('finish');




// Если ошибка из промиса не обработана в методе then, то она
// будет обработана дальше (или выпадет наружу)
// const p = new Promise( (resolve, reject) => {
// 	setTimeout( () => reject( new Error('error_1') ), 2000 )
// }).then( () => console.log('success') )  // не обрабатывает ошибку (нет 2 параметра)
// 	.finally( console.log('ошибка обработается дальше') )
// 	.catch( (data) => alert(data.message) );




// new Promise( (resolve, reject) => {
// 	setTimeout( () => resolve( 'well done' ), 2000 )
// }).then( result => {
// 		result += ', congradulate!';
// 		return result; // можно вернуть любой тип данных ( будет обработано дальше )
// 	}) 
// 	.finally( console.log(`вернувшийся результат обработается в следующем then, 
// 												 а catch проигнорируется`) )
// 	.catch( (data) => alert(data.message) )
// 	.then( val => alert(val) );




// // метод then вернет промис (можно в нем вернуть промис или любой тип данных), 
// // который вернется при вызове ф-ии и обработается дальше
// function loadSome (name) {
// 	return new Promise(res => {
// 		setTimeout(() => res(`done ${name}`), 1000)
// 	// }).then(res => new Promise(resolve => resolve(res + ' !!!!')))
// 	}).then(res => res + ', test (any type)' ) // возвращаемое обернется в выполненный промис 
// }

// loadSome('anton')
// 	.then(res => console.log(res))




// new Promise( (resolve, reject) => {
// 	setTimeout( () => reject( "server's eror 300" ), 2000 )
// })
// 	.catch( (data) => {
// 		// обработка ошибки
// 		data += ', try again';
// 		console.log(data);
// 		// возврат промиса, который вызовет resolve, а тот обработается следующим then
// 		return new Promise( (resolve, reject) => {
// 			setTimeout( () => resolve('new request has received well'), 1500 )
// 		});
// 	})
// 	.then( val => alert(val), () => alert('error for the second time') ); 




// // Ошибка не отловится из-за броска/допущения ошибки в промисе/then из-за setTimeout
// new Promise( (resolve, reject) => {
//   setTimeout( () => throw new Error('error_test'), 2000 )
//   // setTimeout( () => reject (new Error('error_test')), 2000 ) // - так бы cработало
// })
//   .catch( (data) => {
//     console.log(data.message)
//   })







			/* 11.8  async/await */


// Сначала  выполнится синхронный код, потом асинхронный
// console.log('start')
// async function f() {

//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("готово!"), 1000)
//   });

//   let result = await promise; // будет ждать, пока промис не выполнится

//   alert(result); // "готово!"
// }

// f();

// // тяжёлая функция
// function q() {
//   for (let i = 0; i < 1e9; i++) f[i % 2] = i;
// }
// q();
// console.log('finish')




// async function loadJson(url) {
// 	try{
// 		let response = await fetch(url);
// 		if (response.status == 200) {
// 			return response.json();
// 		} 
// 		throw new Error(response.status);
// 	} 
// 	catch(e) {
// 		alert(e)
// 	}
// }
// loadJson('no-such-user.json')




// class HttpError extends Error {
//   constructor(response) {
//     super(`${response.status} for ${response.url}`);
//     this.name = 'HttpError';
//     this.response = response;
//   }
// }

// async function loadJson(url) {
//   let response = await fetch(url);
//   if (response.status == 200) {
//     return response.json();
//   } else {
//     throw new HttpError(response);
//   }
// }

// // Запрашивать логин, пока github не вернёт существующего пользователя.
// async function demoGithubUser() {
//   let user;

//   while(true) {
//     let name = prompt("Введите логин?", "webmag-anton");

//     try {
//       user = await loadJson(`https://api.github.com/users/${name}`);
//       break; // ошибок не было, выходим из цикла
//     } catch(err) {
//       if (err instanceof HttpError && err.response.status == 404) {
//         // после alert начнётся новая итерация цикла
//         alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
//       } else {
//         // неизвестная ошибка, пробрасываем её
//         throw err;
//       }
//     }
//   }

//   alert(`Полное имя: ${user.name}.`);
//   return user;
// }
// demoGithubUser();






			/* 11.8  Генераторы */


// function* gen() {
// 	yield 'H'
// 	yield 'e'
// 	yield 'l'
// 	yield 'l'
// 	yield 'o'
// }

// const generator = gen();

// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())




// let range = {
//   from: 1,
//   to: 5,

//   *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
//     for(let value = this.from; value <= this.to; value++) {
//       yield value;
//     }
//   }
// };

// alert( [...range] ); // 1,2,3,4,5




// function* generateSequence(start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i;
//   }
// }

// for(let value of generateSequence(1, 5)) {
//   alert(value); // 1, потом 2, потом 3, потом 4, потом 5
// }




// // Асинхронный генератор
// async function* generateSequence(start, end) {

//   for (let i = start; i <= end; i++) {
//     // ура, можно использовать await!
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     yield i;
//   }
// }

// (async () => {
//   let generator = generateSequence(1, 5);
//   for await (let value of generator) {
//     alert(value); // 1, потом 2, потом 3, потом 4, потом 5
//   }
// })();






			/* 14.1  Proxy */


// let user = {
//   name: "John"
// };

// function wrap(target) {
//   return new Proxy(target, {
//       get(tar, prop) {
//       	if (prop in tar) {
//       		return tar[prop]
//       	} else {
//       		throw new ReferenceError('Ошибка: такого свойства не существует')
//       	}	
//       }
//   });
// }

// user = wrap(user);

// alert(user.name); // John
// alert(user.age); // Ошибка: такого свойства не существует





// let array = [1, 2, 3];

// array = new Proxy(array, {
// 	get(tar, prop) {
// 		if ( prop < 0 ) {
// 			let N = +prop + tar.length;
// 			return tar[N]
// 		} else {
// 			return tar[prop]
// 		}
// 	}
// });

// alert( array[-1] ); // 3
// alert( array[-2] ); // 2
