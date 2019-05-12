               

                		/***   ООП в прототипном стиле   ***/



    // 9.1  Прототип объекта



// var animal = {
//   eats: true
// };

// var rabbit = {
//   jumps: true,
//   __proto__: animal
// };

// alert( rabbit.hasOwnProperty('jumps') ); // true: jumps принадлежит rabbit

// alert( rabbit.hasOwnProperty('eats') ); // false: eats не принадлежит







// Объект, создаваемый при помощи Object.create(null) не имеет прототипа, а значит 
// в нём нет лишних свойств (например toString). Для коллекции – как раз то, что надо.







// var head = {
//   glasses: 1
// };
// var table = {
//   pen: 3
// };
// var bed = {
//   sheet: 1,
//   pillow: 2
// };
// var pockets = {
//   money: 2000
// };

// // pockets -> bed -> table -> head

// pockets.__proto__ = bed;
// bed.__proto__ = table;
// table.__proto__ = head;

// alert( bed.glasses == 1 );







		// 9.2  Свойство F.prototype и создание объектов через new



// obj.__proto__      равно     Func.prototype (для конструктора)


// // Изначально в конструкторах есть св-во prototype, которое равно 
// // объекту со св-вом constructor, равным конструктору
// Func.prototype = {
//   constructor: Rabbit
// };

// function Rabbit() {}
// // в Rabbit.prototype есть одно свойство: constructor
// alert( Object.getOwnPropertyNames(Rabbit.prototype) ); // constructor
// // оно равно Rabbit
// alert( Rabbit.prototype.constructor == Rabbit ); // true




// function Rabbit(name) {
//   this.name = name;
//   alert( name );
// }

// var rabbit = new Rabbit("Кроль");

// // (св-во constructor заимствуется из дефолтного объекта, на который ссылается prototype)
// var rabbit2 = new rabbit.constructor("Крольчиха"); 

// // Эта возможность бывает полезна, когда, получив объект, мы не 
// // знаем в точности, какой у него был конструктор (например, 
// // сделан вне нашего кода), а нужно создать такой же.






// // задачи




// // Результат: true. Свойство prototype всего лишь задаёт __proto__ у 
// // новых объектов.  Так что его изменение не повлияет на rabbit.__proto__. 
// // Свойство eats будет получено из прототипа.

// function Rabbit() {}
// Rabbit.prototype = {
//   eats: true
// };

// var rabbit = new Rabbit();

// Rabbit.prototype = {};

// // undefined будет уже для новых объектов
// alert( rabbit.eats ); // true

// var rabbit2 = new Rabbit();
// alert( rabbit2.eats ); // undefined








// // Результат: false. Свойство Rabbit.prototype и rabbit.__proto__ указывают на один и 
// // тот же объект. В данном случае изменения вносятся в сам объект.

// function Rabbit(name) {}
// Rabbit.prototype = {
//   eats: true
// };

// var rabbit = new Rabbit();

// Rabbit.prototype.eats = false;

// alert( rabbit.eats ); // false








// // Результат: true, так как delete rabbit.eats попытается удалить eats из 
// // rabbit, где его и так нет. А чтение в alert произойдёт из прототипа.

// function Rabbit(name) {}
// Rabbit.prototype = {
//   eats: true
// };

// var rabbit = new Rabbit();

// delete rabbit.eats;

// alert( rabbit.eats ); // true









// function Menu(options) {
//   var newOptions = Object.create(options);
//   newOptions.width = options.width || 300;

//   alert("width: " + newOptions.width);
//   alert("height: " + newOptions.height);
// }

// var options = {
//   width: 100,
//   height: 200
// };

// var menu = new Menu(options);










		// 9.3  Встроенные "классы" в JavaScript




// function showList() {
//   alert( Array.prototype.join.call(arguments, " - ") );
// }

// showList("Вася", "Паша", "Маша"); // Вася - Паша - Маша







// String.prototype.repeat = function(times) {
//   return new Array(times + 1).join(this);
// };

// alert( "ля".repeat(3) ); // ляляля









// Object.prototype.each = function(f) {
//   for (var prop in this) {
//   	// исключение each (пропускать свойства из прототипа)
//   	if ( !this.hasOwnProperty(prop) ) continue;

//     var value = this[prop];
//     f.call(null, prop, value); // вызовет f(prop, value)
//   }
// }

// var user = {
//   name: 'Вася',
//   age: 25
// };

// user.each(function(property, val) {
//   alert( property );
// });





	// так правильней, что бы во всех созданных объектах 
	// не было видно each в цикле for..in





// Object.prototype.each = function(f) {
//   for (var prop in this) {
//     var value = this[prop];
//     f.call(null, prop, value); 
//   }
// }

// // поправить объявление свойства, установив флаг enumerable: false
// Object.defineProperty(Object.prototype, 'each', {
//   enumerable: false
// });

// var user = {
//   name: 'Вася',
//   age: 25
// };

// user.each(function(property, val) {
//   alert( property );
// });











// Function.prototype.defer = function(ms) {
// 	setTimeout(this, ms);
// };

// function f() {
//   alert( "привет" );
// };

// f.defer(2000);











// Function.prototype.defer = function(ms) {

// 	var th = this;
	
// 	return function() {
// 		var args = arguments
// 		setTimeout( function() {th.apply(null, args)}, ms)
// 	}

// };


// function f(a, b) {
//   alert( a + b );
// }

// f.defer(1500)(1, 2);