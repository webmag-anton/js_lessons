

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








			// 10.5   Объекты и прототипы




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
// // Действует долько в методе объекта, не в свойстве-функции! 

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