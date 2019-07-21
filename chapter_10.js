

														/***   Современные возможности ES-2015   ***/



			// 10.4   Функции

'use strict';



// // Параметры по умолчанию

// function showMenu(title = "Заголовок", width = 100, height = 200) {
//   alert('title=' + title + ' width=' + width + ' height=' + height);
// }

// // По умолчанию будут взяты 1 и 3 параметры
// // title=Заголовок width=null height=200
// showMenu(undefined, null);





// function showName(firstName, lastName, ...rest) {
//   alert(firstName + ' ' + lastName + ' - ' + rest);
// }

// // выведет: Юлий Цезарь - Император,Рима
// // В rest попадёт массив всех аргументов, начиная с третьего.
// showName("Юлий", "Цезарь", "Император", "Рима");









// // Деструктуризация в параметрах

// let options = {
//   title: "Меню"
// };

// function showMenu({title="Заголовок", width:w=100, height:h=200}) {
//   alert(title + ' ' + w + ' ' + h);
// }

// // объект options будет разбит на переменные
// showMenu(options); // Меню 100 200








// // Вызов без аргументов

// // нужно добавить параметр по умолчанию ( пустой объект для деструктуризации )
// function showMenu({title="Заголовок", width:w=100, height:h=200} = {}) {
//   alert(title + ' ' + w + ' ' + h);
// }

// showMenu(); // Заголовок 100 200











// // Имя «name».  В свойстве name у функции находится её имя.

// function f() {} // f.name == "f"

// let g = function g() {}; // g.name == "g"

// let user = {
//   // свойство user.sayHi.name == "sayHi"
//   sayHi: function() {}
// };









// // Функции в блоке.  
// // Объявление Function Declaration, сделанное в блоке, видно только в этом блоке.

// if (true) {

//   sayHi(); // работает

//   function sayHi() {
//     alert("Привет!");
//   }

// }
// sayHi(); // ошибка, функции не существует








// let arr = [5, 8, 3];
// let sorted = arr.sort( (a,b) => a - b );
// alert(sorted); // 3, 5, 8








// // Функции-стрелки не имеют своего this

// let group = {
//   title: "Наш курс",
//   students: ["Вася", "Петя", "Даша"],

//   showList: function() {
//     this.students.forEach(
//       student => alert(this.title + ': ' + student)
//     )
//   }
// }

// group.showList();
// // Наш курс: Вася
// // Наш курс: Петя
// // Наш курс: Даша








// // Функции-стрелки не имеют своего arguments

// function f() {
//   let showArg = () => alert(arguments[0]);
//   showArg();
// }

// f(1); // 1






// // использование в декораторах

// function defer(f, ms) {
//   return function() {
//     setTimeout(() => f.apply(this, arguments), ms) // можно null вместо this
//   }
// }

// function sayHi(who) {
//   alert('Привет, ' + who);
// }

// let sayHiDeferred = defer(sayHi, 2000);
// sayHiDeferred("Вася"); // Привет, Вася через 2 секунды








			// 10.5   Строки




// let apples = 2;
// let oranges = 3;

// alert(`${apples} + ${oranges} = ${apples + oranges}`); // 2 + 3 = 5







// Функции шаблонизации

// // str восстанавливает строку ( «склеить» полученные фрагменты в строку )
// function str(strings, ...values) {
//   let str = "";
//   for(let i=0; i<values.length; i++) {
//     str += strings[i];
//     str += values[i];
//   }

//   // последний кусок строки
//   str += strings[strings.length-1];
//   return str;
// }

// let apples = 3;
// let oranges = 5;

// // Sum of 3 + 5 = 8!
// alert( str`Sum of ${apples} + ${oranges} = ${apples + oranges}!`);








			// 10.6   Объекты и прототипы





// // Если имя свойства находится в переменной или задано 
// // выражением expr, то его можно указать в квадратных скобках [expr].

// let propName = "firstName";

// let user = {
//   [propName]: "Вася"
// };

// alert( user.firstName ); // Вася








// let user = { name: "Вася" };
// let visitor = { isAdmin: false, visits: true };
// let admin = { isAdmin: true };

// Object.assign(user, visitor, admin);

// alert( JSON.stringify(user) ); // name: Вася, visits: true, isAdmin: true





// // //Его также можно использовать для 1-уровневого клонирования объекта:

// let user = { name: "Вася", isAdmin: false };

// // clone = пустой объект + все свойства user
// let clone = Object.assign({}, user);









// // Метод Object.is()    Сравнение +0 и -0

// alert( Object.is(+0, -0)); // false
// alert( +0 === -0 );        // true

// // Сравнение с NaN
// alert( Object.is(NaN, NaN) ); // true
// alert( NaN === NaN );         // false









// let name = "Вася";
// let user = {
//   name,
//   // вместо "sayHi: function() {...}" пишем "sayHi() {...}"
//   sayHi() {
//     alert(this.name);
//   }
// };

// user.sayHi(); // Вася









// let name = "Вася";
// let user = {
//   name,
//   // вместо "sayHi: function() {...}" пишем "sayHi() {...}"
//   sayHi() {
//     alert(this.name);
//   }
// };

// user.sayHi(); // Вася








// // Геттер
// let name = "Вася", surname="Петров";
// let user = {
//   name,
//   surname,
//   get fullName() {
//     return `${name} ${surname}`;
//   }
// };

// alert( user.fullName ); // Вася Петров










// // super - из метода объекта получает свойство его прототипа.
// // Действует только в методе объекта, не в свойстве-функции! 

// let animal = {
//   walk() {
//     alert("I'm walking");
//   }
// };

// let rabbit = {
//   __proto__: animal,
//   walk() {
//     alert(super.walk); // walk() { … }
//     super.walk(); // I'm walking
//   }
// };

// rabbit.walk();






// // При создании метода – он привязан к своему объекту навсегда!
// let animal = {
//   walk() { alert("I'm walking"); }
// };

// let rabbit = {
//   __proto__: animal,
//   walk() {
//     super.walk();
//   }
// };

// let walk = rabbit.walk; // скопируем метод в переменную
// walk(); // вызовет animal.walk()
// // I'm walking









					// 10.7  Классы




// // Функция constructor запускается при создании new User, 
// // остальные методы записываются в User.prototype. 
// // Параметры задаются в constructor

// class User {

//   constructor(name) {
//     this.name = name;
//   }

//   sayHi() {
//     alert(this.name);
//   }

// }

// let user = new User("Вася");
// user.sayHi(); // Вася









// let allModels = {};

// function createModel(Model, ...args) {
//   let model = new Model(...args);

//   model._id = Math.random().toString(36).slice(2);
//   allModels[model._id] = model;

//   return model;
// }

// let user = createModel(class User {
//   constructor(name) {
//     this.name = name;
//   }
//   sayHi() {
//     alert(this.name);
//   }
// }, "Вася");

// user.sayHi(); // Вася

// alert( allModels[user._id].name ); // Вася









// // В классах, как и в обычных объектах, можно объявлять геттеры и сеттеры 
// // через get/set, а также использовать […] для свойств с вычисляемыми именами:

// class User {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   // геттер
//   get fullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }

//   // сеттер ( с деструктуризацией )
//   set fullName(newValue) {
//     [this.firstName, this.lastName] = newValue.split(' ');
//   }

//   // вычисляемое название метода
//   ["test".toUpperCase()]() {
//     alert("PASSED!");
//   }

// };

// let user = new User("Вася", "Пупков");
// alert( user.fullName ); // Вася Пупков
// user.fullName = "Иван Петров";
// alert( user.lastName ); // Петров
// user.TEST(); // PASSED!








// // Статические свойства

// class User {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   static createGuest() {
//     return new User("Гость", "Сайта");
//   }
// };

// let user = User.createGuest();

// alert( user.firstName ); // Гость
// alert( User.createGuest ); // createGuest ... (функция)









// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   walk() {
//     alert("I walk: " + this.name);
//   }
// }

// class Rabbit extends Animal {

// }

// new Rabbit("Вася").walk();
// // I walk: Вася




// class Rabbit_two extends Animal {
//   walk() {
//     super.walk();
//     alert("...and jump!");
//   }
// }


// new Rabbit_two("Маша").walk();
// // I walk: Маша
// // and jump!








// // Если же у потомка свой constructor, то, чтобы в нём вызвать конструктор 
// // родителя – используется синтаксис super() с аргументами для родителя.

// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   walk() {
//     alert("I walk: " + this.name);
//   }
// }

// class Rabbit extends Animal {
//   constructor() {
//     // вызвать конструктор Animal с аргументом "Кроль"
//     super("Кроль"); // то же, что и Animal.call(this, "Кроль")
//   }
// }

// new Rabbit().walk(); // I walk: Кроль










					// 10.8  Примитивный тип данных Symbol




// let sym = Symbol();
// alert( typeof sym ); // symbol






// let sym = Symbol("name");
// alert( sym.toString() ); // Symbol(name)





// // если у двух символов одинаковое имя, то это не значит, что они равны:
// alert( Symbol("name") == Symbol("name") ); // false






// // Если хочется из разных частей программы использовать именно одинаковый
// // символ, то можно передавать между ними объект символа или 
// // же – использовать «глобальные символы» и «реестр глобальных символов»


// // создание символа в реестре
// let name = Symbol.for("name");

// // символ уже есть, чтение из реестра
// alert( Symbol.for("name") == name ); // true






// // У вызова Symbol.for, который возвращает символ по имени, есть обратный 
// // вызов – Symbol.keyFor(sym). Он позволяет получить по глобальному символу его имя:

// // создание символа в реестре
// let test = Symbol.for("name");

// // получение имени символа
// alert( Symbol.keyFor(test) ); // name








					// 10.9  Итераторы




// Для перебора итерируемых объектов добавлен новый синтаксис цикла: for..of

// let arr = [1, 2, 3]; // массив — пример итерируемого объекта
// for (let value of arr) {
//   alert(value); // 1, затем 2, затем 3
// }





// Также итерируемой является строка:
// for (let char of "Привет") {
//   alert(char); // Выведет по одной букве: П, р, и, в, е, т
// }





// Свой итератор


// // Для возможности использовать объект в for..of нужно создать в 
// // нём метод с названием Symbol.iterator (системный символ).

let range = {
  from: 1,
  to: 5
}

// сделаем объект range итерируемым
range[Symbol.iterator] = function() {

  let current = this.from;
  let last = this.to;

  // метод должен вернуть объект с методом next()
  return {
    next() {
      if (current <= last) {
        return {
          done: false,
          value: current++
        };
      } else {
        return {
          done: true
        };
      }
    }

  }
};


// Конструкция for..of в начале своего выполнения 
// автоматически вызывает Symbol.iterator()
for (let num of range) {
  alert(num); // 1, затем 2, 3, 4, 5
}

// ...spread так же использует итератор
alert( Math.max(...range) );