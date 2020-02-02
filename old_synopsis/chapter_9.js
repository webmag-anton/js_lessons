               

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



// «Псевдоклассом» или, более коротко, «классом», 
// называют функцию-конструктор вместе с её prototype. 
// Такой способ объявления классов называют «прототипным стилем ООП».






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





	// так правильней(ниже), что бы во всех созданных объектах 
	// не было видно each (из прототипа) в цикле for..in





// Object.prototype.each = function(f) {
//   for (var prop in this) {
//     var value = this[prop];
//     f.call(null, prop, value); 
//   }
// }

// // поправить объявление свойства, установив в дискрипторе 
// // флаг enumerable: false 
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






// // задачи



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









		// 9.4  Свои классы на прототипах



// // функциональный стиль 

// function CoffeeMachine(power) {
//   var waterAmount = 0;

//   var WATER_HEAT_CAPACITY = 4200;

//   function getTimeToBoil() {
//     return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//   }

//   this.run = function() {
//     setTimeout(function() {
//       alert( 'Кофе готов!' );
//     }, getTimeToBoil());
//   };

//   this.setWaterAmount = function(amount) {
//     waterAmount = amount;
//   };

// }

// var coffeeMachine = new CoffeeMachine(10000);
// coffeeMachine.setWaterAmount(50);
// coffeeMachine.run();






// // прототипный стиль ( в виде класса )

// function CoffeeMachine(power) {
//   // свойства конкретной кофеварки
//   this._power = power;
//   this._waterAmount = 0;
// }

// // свойства и методы для всех объектов класса
// CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;

// CoffeeMachine.prototype._getTimeToBoil = function() {
//   return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
// };

// CoffeeMachine.prototype.run = function() {
//   setTimeout(function() {
//     alert( 'Кофе готов!' );
//   }, this._getTimeToBoil());
// };

// CoffeeMachine.prototype.setWaterAmount = function(amount) {
//   this._waterAmount = amount;
// };

// var coffeeMachine = new CoffeeMachine(10000);
// coffeeMachine.setWaterAmount(50);
// coffeeMachine.run();








// function Hamster() {
// 	this.food = [];
// }

// Hamster.prototype.found = function(something) {
//   this.food.push(something);
// };

// // Создаём двух хомяков и кормим первого
// var speedy = new Hamster();
// var lazy = new Hamster();

// speedy.found("яблоко");
// speedy.found("орех");

// alert( speedy.food.length );
// alert( lazy.food.length ); 














  // 9.5  Наследование классов в JavaScript





// // 1. Конструктор Animal
// function Animal(name) {
//   this.name = name;
//   this.speed = 0;
// }

// // 1.1. Методы -- в прототип

// Animal.prototype.stop = function() {
//   this.speed = 0;
//   alert( this.name + ' стоит' );
// }

// Animal.prototype.run = function(speed) {
//   this.speed += speed;
//   alert( this.name + ' бежит, скорость ' + this.speed );
// };

// // 2. Конструктор Rabbit
// function Rabbit(name) {
//   this.name = name;
//   this.speed = 0;
// }

// // 2.1. Наследование
// Rabbit.prototype = Object.create(Animal.prototype);
// Rabbit.prototype.constructor = Rabbit;

// // 2.2. Методы Rabbit
// Rabbit.prototype.jump = function() {
//   this.speed++;
//   alert( this.name + ' прыгает, скорость ' + this.speed );
// }






// // Т.к. св-ва у конструкторов одинвковы, то можно копировать
// // их в Rabbit

// function Rabbit(name) {
//   Animal.apply(this, arguments);
// }




// // Переопределение метода

// // Вызов rabbit.run() теперь будет брать run из своего прототипа:
// Rabbit.prototype.run = function(speed) {
//   this.speed++;
//   this.jump();
// };


// // Вызов метода родителя внутри своего
// Rabbit.prototype.run = function() {
//   // вызвать метод родителя, передав ему текущие аргументы
//   // Если вызвать просто Animal.prototype.run(), то в 
//   // качестве this функция run получит Animal.prototype
//   Animal.prototype.run.apply(this, arguments);
//   this.jump();
// }







// // задачи







// function Clock(options) {
//   this._template = options.template;
// }

// Clock.prototype._render = function() {
//   var date = new Date();

//   var hours = date.getHours();
//   if (hours < 10) hours = '0' + hours;

//   var min = date.getMinutes();
//   if (min < 10) min = '0' + min;

//   var sec = date.getSeconds();
//   if (sec < 10) sec = '0' + sec;

//   var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

//   console.log(output);
// };

// Clock.prototype.stop = function() {
//   clearInterval(this._timer);
// };

// Clock.prototype.start = function() {
//   this._render();

//   // 	Если просто this._render - будет потеря конткста
//   this._timer = setInterval( this._render.bind(this), 1000);
// };


// // var clock = new Clock({
// // 	template: 'h:m:s'
// // });
// // clock.start();







// function ClockExtended(options) {
// 	Clock.apply(this, arguments);

// 	this._precision = +options.precision || 2000;
// };

// ClockExtended.prototype = Object.create(Clock.prototype);
// ClockExtended.prototype.constructor = ClockExtended;

// ClockExtended.prototype.precision = function(precision) {
// 	this._render();

// 	// 	Если просто this._render - будет потеря конткста
//   this._timer = setInterval( this._render.bind(this), this._precision);
// };


// var clockPrecision = new ClockExtended({
// 	template: 'h:m:s'
// });
// clockPrecision.precision();









// function Menu(state) {
//   this._state = state || this.STATE_CLOSED;
// };

// Menu.prototype.STATE_CLOSED = 0;
// Menu.prototype.STATE_OPEN = 1;

// Menu.prototype.close = function() {
//   this._state = this.STATE_CLOSED;
// };

// Menu.prototype.open = function() {
//   this._state = this.STATE_OPEN;
// };

// Menu.prototype._stateAsString = function() {
//   switch (this._state) {
//     case this.STATE_OPEN:
//       return 'открыто';

//     case this.STATE_CLOSED:
//       return 'закрыто';
//   }
// };

// Menu.prototype.showState = function() {
//   alert(this._stateAsString());
// }





// function AnimatingMenu() {
// 	Menu.apply(this, arguments);
// }

// AnimatingMenu.prototype = Object.create(Menu.prototype);

// AnimatingMenu.prototype.STATE_ANIMATING = 2;

// AnimatingMenu.prototype.open = function() {
// 	this._state = this.STATE_ANIMATING;

// 	this._timer = setTimeout( Menu.prototype.open.bind(this), 1000);
// };

// AnimatingMenu.prototype.close = function() {
// 	clearTimeout(this._timer);
// 	Menu.prototype.close.apply(this);
// };

// AnimatingMenu.prototype._stateAsString = function() {

// 	switch (this._state) {
// 		case this.STATE_ANIMATING:
// 		return 'анимация';

// 		default:
// 		return Menu.prototype._stateAsString.call(this);
// 	}
// };

// // тест, использование..
// var menu = new AnimatingMenu();

// menu.showState(); // закрыто

// menu.open();
// menu.showState(); // анимация

// setTimeout(function() { // через 1 секунду
//   menu.showState(); // открыто

//   menu.close();
//   menu.showState(); // закрыто
// }, 1000);









		// 9.7  Свои ошибки, наследование от Error




// // задача

// function FormatError(message) {
//   this.name = "FormatError";

//   this.message = message;

//   if (Error.captureStackTrace) {
//     Error.captureStackTrace(this, this.constructor);   /* для V8 (Chrome, Opera, Node.JS) */
//   } else {
//     this.stack = (new Error()).stack;									 /* для остального */		
//   }

// }

// FormatError.prototype = Object.create(SyntaxError.prototype);
// FormatError.prototype.constructor = FormatError;

// // Использование

// var err = new FormatError("ошибка форматирования");

// alert( err.message ); // ошибка форматирования
// alert( err.name ); // FormatError
// alert( err.stack ); // стек на момент генерации ошибки

// alert( err instanceof SyntaxError ); // true










		// 9.8  ПРимеси ( mixins )




// // примесь
// var sayHiMixin = {
//   sayHi: function() {
//     alert("Привет " + this.name);
//   },
//   sayBye: function() {
//     alert("Пока " + this.name);
//   }
// };

// // использование:
// function User(name) {
//   this.name = name;
// }

// // передать методы примеси
// for(var key in sayHiMixin) User.prototype[key] = sayHiMixin[key];

// // User "умеет" sayHi
// new User("Вася").sayHi(); // Привет Вася





// var eventMixin = {

//   /**
//    * Подписка на событие
//    * Использование:
//    *  menu.on('select', function(item) { ... }
//    */
//   on: function(eventName, handler) {
//     if (!this._eventHandlers) this._eventHandlers = {};
//     if (!this._eventHandlers[eventName]) {
//       this._eventHandlers[eventName] = [];
//     }
//     this._eventHandlers[eventName].push(handler);
//   },

//   /**
//    * Прекращение подписки
//    *  menu.off('select',  handler)
//    */
//   off: function(eventName, handler) {
//     var handlers = this._eventHandlers && this._eventHandlers[eventName];
//     if (!handlers) return;
//     for(var i=0; i<handlers.length; i++) {
//       if (handlers[i] == handler) {
//         handlers.splice(i--, 1);
//       }
//     }
//   },

//   /**
//    * Генерация события с передачей данных
//    *  this.trigger('select', item);
//    */
//   trigger: function(eventName /*, ... */) {

//     if (!this._eventHandlers || !this._eventHandlers[eventName]) {
//       return; // обработчиков для события нет
//     }

//     // вызвать обработчики
//     var handlers = this._eventHandlers[eventName];
//     for (var i = 0; i < handlers.length; i++) {
//       handlers[i].apply(this, [].slice.call(arguments, 1));
//     }

//   }
// };