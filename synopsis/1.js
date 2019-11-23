// Относительный и абсолютный(url  сайта...) путь; Относительный: относительно корня(/path/...),
// относительно текущего места (./path/... - текущая папка, ../path - родительская)
					

					/*** Basic ***/


// null - значение неизвестно;   
// undefined - значение не присвоено

// typeof null возвращается "object"

// undefined при численном преобразовании становится NaN, не 0
// "0" и строки с одними пробелами " " при логическом преоб-ии true

// alert(null == null);  //true
// alert(undefined == undefined);  //true
// alert(null == undefined);  //true
// alert(null === undefined);  //false



// Циклы

- for ;; - общий
- for let key in object - для объектов
// в массивах доступ только к значениям элементов (к индексам нет доступа)
- for let fruit of fruits - общий, используется в итерируемых объектах, 
то есть в объектах с методом [Symbol.iterator](); В строках, массивах и map 
изначально встроен, в объектах - нет  



// Деструктуризация ( деструктурирующее присваивание )

-  для объекта - let {prop : varName = default, ...rest} = object
-  для массива - let [item1 = default, item2, ...rest] = array




					/*** properties and functions in js ***/


// Преобразование типов
преобразование значения к строке - String(value)
преобразование значения к числу  - Number(value)
преобразование значения к булеву - Boolean(value)



// Взаимодействие: alert(message), 
//                 prompt(title, [default]), 
//                 confirm(question)
alert()   - преобразует к строке и выводит
prompt()  - <string or null>
confirm() - <boolean>



// Результат функции с пустым return
// или без него – undefined
function doNothing() {};
alert( doNothing() ); // undefined



// Преобразование объектов в примитивы
В зависимости от варианта преобразований - «хинта» - всего 3,
вызываются такие методы объекта
- obj[Symbol.toPrimitive](hint) - метод с символьным ключом, 
универсальный метод, преобразование в зависимости от хинта
- Иначе, если хинт равен string - obj.toString(), а если его нет, 
то obj.valueOf(), если он существует
- Если хинт равен number или default - obj.valueOf(), а если его нет, 
то obj.toString()

В отсутствие Symbol.toPrimitive и valueOf, toString обработает 
все случаи преобразований к примитивам
методы должны возвращать примитив, а не объект



		/* Символы: */

Symbol.("name") - создание с именем

читаем глобальный символ из глобального реестра и записываем 
его в переменную; если символа не существует, 
то он будет создан с именем; глобальный реестр
нужен для обращения к одному и тому же символу 
let sym = Symbol.for("id")

принимает глобальный символ и возвращает его имя
Symbol.keyFor(sym) // id

для любых символов доступно свойство description, возвращее имя



		/* Числа: */

alert( NaN === NaN ); // false
Math.floor() - округление в меньшую сторону 3.1 становится 3
Math.ceil()  - округление в большую сторону 3.1 становится 4
Math.round() - округление до ближайшего целого 3.5 становится 4
num.toFixed(n) - <string> - округляет число до n знаков 
после запятой, допускает неточность!
// 6.35 -> 63.5 -> 64(rounded) -> 6.4 - способ устраняющий неточность
Math.round(6.35 * 10) / 10 
isNaN(value) - <boolean> - преобразует в число и проверяет является ли оно NaN
isFinite(value) преобразует в число и возвращает true, 
если оно является обычным числом - не NaN/Infinity/-Infinity
parseInt('str') - возвращает целое число из строки или NaN
parseFloat('str') - возвращает дробное число из строки или NaN



		/* Строки: */

str.indexOf(substr, pos) - <number or -1> - поиск подстроки
str.includes(substr, pos) - <boolean>
str.slice(start [, end]) - получение подстроки без вырезания
str.codePointAt(pos) - возвращает код символа на позиции pos
String.fromCodePoint(code) - создаёт символ по его коду code



		/* Методы объектов: */

копирует св-ва (и строковые и символьные) всех объектов srcN в dest,
не для глубокого клон-я (без вложенных объектов)
Object.assign(dest, [src1, src2, src3...]) 

Object.keys(obj) – возвращает массив ключей
Object.values(obj) – возвращает массив значений
Object.entries(obj) – возвращает массив пар [ключ, значение]
Object.fromEntries(iterable) - преобразует массив пар [ключ, значение] в объект

Object.getOwnPropertySymbols() - возвращает массив только символьных ключей

Object.getOwnPropertyDescriptor(obj, propertyName) - возвращает бъект, так 
называемый «дескриптор свойства»: он содержит значение свойства и все его флаги
Object.defineProperty(obj, propertyName, descriptor) - чтобы изменить флаги, а
если св-ва нет то оно создается с указанными флагами; если какой-либо флаг не 
указан явно, ему присваивается значение false 
пример деск-ра { "value": 1, "writable": false, "enumerable": false, "configurable": false }
Object.getOwnPropertyDescriptors(obj) - получить все дескрипторы свойств сразу
Object.defineProperties(obj, { prop1: descriptor1, prop2: descriptor2 })
//клонирование объекта вместе с его флагами
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

Помимо обычных свойств-данных у объектов есть свойства-аксессоры; 
Они представлены методами «геттер» и «сеттер»
let obj = {
  get propName() {
    // геттер, срабатывает при чтении obj.propName
  },
  set propName(value) {
    // сеттер, срабатывает при записи obj.propName = value
  }
}

свойство __proto__ ссылается на прототип объекта; оно является геттером/сеттером для
внутреннего скрытого св-ва [[Prototype]], значением которого является либо другой 
объект - прототип, либо null;

Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта, 
кроме св-в объкта из «вершины иерархии» - Object.prototype, так как эти св-ва с 
флагом "enumerable": false - не перечислимы;
Если унаследованные свойства не нужны, то мы можем отфильтровать их при помощи встроенного 
метода - obj.hasOwnProperty(key), который наследуется от Object.prototype.hasOwnProperty

Операции записи/удаления работают непосредственно с объектом, они не используют 
прототип если это обычное свойство, а не сеттер; Сеттер из прототипа используется для записи;
Если мы вызываем метод obj.method(), взятый из прототипа, то this в нем ссылается на obj

Свойство функции-конструктора F.prototype устанавливает [[Prototype]] для новых экземпляров 
при вызове new F(); По умолчанию все функции имеют F.prototype = { constructor: F };

Прототип это объект, а значит его дефолтное значение св-ва [[Prototype]] 
равно Object.prototype , потому что объекты создаются встроенным конструктором Object;

__proto__ - это самый короткий и интуитивно понятный способ установки и чтения прототипа; 
__proto__ находится в Object.prototype, как и некоторые другие методы; бывают и статические 
методы конструктора; В современном языке метод __proto__ заменяют такие статические методы
Object.create(proto, [descriptors])
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj, proto)
// Если установить F.prototype = null, то вновь созданный объект наследует от Object.prototype
// Мы можем создать "простейший" объект без прототипов, т.е без наследования встроенных методов
Object.create(null)
// точная копия obj c тем же прототипом - «продвинутое» клонирование объекта 
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));



		/* Классы */

Класс - продвинутый способ создания обектов, вместо обычного конструктора;
Методы класса попадают в прототип содаваемых объектов, после методов запятая не ставится;

class MyClass {
  prop = value; // присваивается создаваемому объекту, с фиксированным value
  constructor(name) { // конструктор
    this.name = name;
  }
  method(...) {} // метод
  get something(...) {} // геттер
  set something(...) {} // сеттер
}

Наследование классов имеет синтаксис class Child extends Parent; 
При этом Child.prototype.__proto__ будет равен Parent.prototype;
Если у Child не указан конструктор, то он унаследуется от Parent; 
Если необходимо переопределить конструктор у Child, то обязателен вызов конструктора 
родителя с помощью ключевого слова super() в конструкторе Child до обращения к this;
Мы можем вызвать super.method() в методе Child для обращения к методу родителя Parent;
Так же можно вызвать метод родителя с помощью super.method() и у обычных объектов, 
наследующих друг от друга

Мы также можем присвоить свойство или метод самой функции-классу, а не её prototype; 
Для этого перед свойством или методом ставится слово static; Такие методы  называются 
статическими; Эти свойства или методы не будут иметь отношения к создаваемым объектам;
Статические свойства и методы наследуются между классами при class Child extends Parent, так как 
Child.prototype.__proto__ === Parent.prototype  и  Child.__proto__ === Parent (двойное наследование)

class Parent{
	constructor(name) {
    this.name = name;
  }
  hello() {
  	alert(`hello ${this.name}`)
  }
  static run() {}
}

class Child extends Parent{
	constructor(name, age) {
		super(name);
    this.age = age;
  }
  say(arg) {
  	super.hello();
  	this.age += arg;
  }
}


У встроенных классов есть собственные статические методы, например Object.keys, Array.isArray;
Обычно, когда один класс наследует другому, то наследуются и статические методы; Но встроенные 
классы – исключение; Они не наследуют статические методы друг друга; Например, и Array, и 
Date наследуют от Object, так что в их экземплярах доступны методы из Object.prototype; 
Но Array.[[Prototype]] не ссылается на Object, поэтому нет методов Array.keys() или Date.keys()


	/* инкапсуляция */

В терминах ООП отделение внутреннего интерфейса от внешнего называется инкапсуляция;
Для сокрытия внутреннего интерфейса мы используем защищённые или приватные свойства;
Защищённые поля имеют префикс _; Программисты должны обращаться к полю, 
начинающемуся с _, только  из его класса и классов, унаследованных от него;
Приватные свойства и методы должны начинаться с #; Они доступны только внутри класса;
Мы не можем получить к нему доступ извне или из наследуемых классов;
Защищённые или приватные свойства могут быть как в конструкторе, так и просто св-вом;

	
	/* методы для проверки типа / наследственной принадлежности */

Оператор instanceof позволяет проверить, к какому классу/конструктору принадлежит объект, с 
учётом наследования; Синтаксис  obj instanceof Class - <boolean>; Обычно оператор instanceof 
просматривает для проверки цепочку прототипов; Но это поведение может быть изменено при 
помощи статического метода Symbol.hasInstance

							  работает для																												 возвращает

typeof				  примитивов; typeof null возвращается "object"												 строка
{}.toString		  примитивов, встроенных объектов, объектов с Symbol.toStringTag			 строка
instanceof		  объектов; метод Class[Symbol.hasInstance](obj) - ручная настрока		 true/false


	/* Примеси / Mixins */

Примесь – это объект, методы которого предназначены для использования в других классах, причём 
без наследования от примеси; Пример добавления методов Object.assign(User.prototype, sayHiMixin);
Примеси могут наследовать друг от друга




		/* Методы массивов: */

самый простой способ очистить массив – это arr.length = 0;

позволяет запускать функцию для каждого элемента массива
arr.forEach((item, index, array) => {});

Array.isArray(value) - <boolean>
Array.from() - принимает итерируемый объект или псевдомассив и делает из него «настоящий»


								//	Для добавления/удаления элементов

push(...items) - добавляет items в конец массива
pop() - удаляет элемент в конце массива и возвращает его
shift() - удаляет элемент в начале массива и возвращает его
unshift(...items) - добавляет items в начало массива


arr.slice(start, end) - возвращает подмассив, без вырезания
arr.concat(arg1, arg2...) - создаёт новый массив, в который копирует данные из других

начиная с позиции index, удаляет deleteCount элементов и 
вставляет elem1, ..., elemN на их место; 
Возвращает массив из удалённых элементов
arr.splice(index[, deleteCount, elem1, ..., elemN]) 

								//	Поиск в массиве

arr.indexOf(item, from) - <number or -1> - поиск item
arr.includes(item, from) - <boolean> - поиск item

Метод find ищет первый попавшийся элемент, на котором функция-колбэк вернёт true
arr.find(function(item, index, array) {
	если true - возвращается текущий элемент и перебор прерывается,
	если все итерации оказались ложными возвращается undefined
}) 
arr.findIndex(function(item, index, array) {
	по сути, то же самое, что и arr.find, но возвращает индекс, на котором 
	был найден элемент, а не сам элемент, и -1, если ничего не найдено
}) 

Метод filter возвращает массив из всех подходящих элементов
arr.filter(function(item, index, array) {
  если true - элемент добавляется к результату, и перебор продолжается;
  возвращается пустой массив в случае, если ничего не найдено
})

								//	Преобразование массива

arr.map(function(item, index, array) {
  возвращается новое значение вместо элемента, например return item.length
});

По умолчанию элементы сортируются как строки
arr.sort() - сортирует массив на месте, меняя в нём порядок элементов
Если возвращает положительное число - то большее значение, если отрицательное - меньшее
arr.sort(compareFunc(a, b){}) - собственный порядок сортировки

arr.reverse() - меняет порядок элементов на обратный
str.split(delim) - разбивает строку на массив по заданному разделителю delim
arr.join(glue) - создаёт строку из элементов arr, вставляя glue между ними

используются для вычисления какого-нибудь единого значения на основе всего массива
previousValue – результат предыдущего вызова, равен initial при первом вызове, если передан initial
arr.reduce(function(previousValue, item, index, array) {}, [initial])



		/* Методы объекта Date: */

// месяцы и дни недели начинаются с 0 (январь/воскресенье - 0)
getFullYear() - получить год (4 цифры)
getMonth() - получить месяц, от 0 до 11
getDate() - получить день месяца, от 1 до 31
getHours(), getMinutes(), getSeconds(), getMilliseconds()
getDay() - получить день недели от 0 (воскресенье) до 6 (суббота)
getTime() - получить таймстамп – количество миллисекунд, прошедших с 1 января 1970 года UTC+0
getTimezoneOffset() - Возвращает разницу в минутах между местным часовым поясом и UTC

// У всех этих методов, кроме setTime(), есть UTC-вариант, например: setUTCHours()
setFullYear(year, [month], [date])
setMonth(month, [date])
setDate(date)
setHours(hour, [min], [sec], [ms])
setMinutes(min, [sec], [ms])
setSeconds(sec, [ms])
setMilliseconds(ms)
setTime(ms) - установить таймстамп - количество миллисекунд, прошедших с 1 января 1970 года UTC+0


Date.now() - если нужно просто измерить время - бенчмаркинг

// считывает дату из строки. Формат строки должен быть следующим: YYYY-MM-DDTHH:mm:ss.sssZ
Date.parse(str) - <timestamp or NaN>



		/* Методы	формата JSON (JavaScript Object Notation): */

// Если объект имеет метод toJSON(), то он вызывается через JSON.stringify
JSON.stringify() - для преобразования объектов в JSON
JSON.parse() - для преобразования JSON обратно в объект




		/* обработка ошибок */

// Обычно скрипт в случае ошибки «падает» (сразу же останавливается), с выводом ошибки в консоль.
// Но есть синтаксическая конструкция try..catch, которая позволяет «ловить» ошибки и вместо 
// падения делать что-то более осмысленное. 
// То есть если ошибка отловлена, то код за конструкцией продолжает выполняться.

try {
	// Если в коде нет ошибок, то блок catch(err) игнорируется: выполнение доходит 
  // до конца try и потом далее полностью пропуская catch. Если ошибка - то выполнение 
  // try прерывается, и поток управления переходит в начало catch(errObj)

  // Если ошибки нет, но, например, не выполняется какое то наше условие, то можно "кинуть"
  // свою ошибку с помощью оператора throw. Синтаксис: throw <объект ошибки>
  // В JS есть множество встроенных конструкторов(классов) для стандартных ошибок: Error, 
  // SyntaxError, ReferenceError, TypeError и др. Их синтаксис: let error = new Error(message);
  // Для встроенных ошибок свойство name – это в точности имя конструктора. А свойство message 
  // берётся из аргумента.
} catch (errObj) {
  // обработка ошибки
  // errObj - объект ошибки содержащий основные св-ва: name, message и stack (текущий стек вызова)

  // Проброс исключения (ошибки); например если мы хотим обрабатывать только определенные ошибки: 
  if (errObj.name == "SyntaxError") {
    alert( "My Error: " + errObj.message );
  } else {
    throw errObj; // проброс (*)
  }
  // проброшенная ошибка «выпадает наружу» и может быть поймана другой внешней 
  // конструкцией try..catch (если есть), или «убьёт» скрипт.
}
// Конструкция try..catch может содержать ещё одну секцию: finally, она выполняется в 
// любом случае: после try, если не было ошибок, или после catch, если ошибки были.
// Конструкция try..finally без секции catch также полезна. Мы применяем её, когда не хотим здесь 
// обрабатывать ошибки (пусть выпадут наружу), но хотим быть уверены, что начатое завершилось.
finally {
  // выполняем всегда; даже если в try есть return, то сначала выполнится finally
}




		/* Асинхронность */

// Допустим, что у нас есть 2 строки кода. Первая идет за второй. Синхронность означает то, 
// что строка 2 не может запуститься до тех пор, пока строка 1 не закончит своё выполнение.
// JS однопоточный, что означает то, что только один блок кода может запускаться за раз.

// Пример асинхронности - функция setTimeout. Когда поток выполнения доходит до нее, то он 
// видит отсрочку и переходит к выполнению следующего кода. Если несколько setTimeout, то
// они после прошедшего времени отсрочки попадают в очередь в порядке отсрочки (чем меньше
// время отсрочки, тем первей в очереди). Функции из очереди выполняются только после 
// завершения выполнения синхронного кода и в порядке очереди.

// Пусть даже JavaScript и однопоточный, мы можем достичь согласованности действий 
// через асинхронное исполнение задач.





		/* Promise */

// У объекта promise, возвращаемого конструктором new Promise, есть внутренние свойства:
// - state («состояние») — вначале "pending" («ожидание»), потом меняется на 
// 	"fulfilled" («выполнено успешно») при вызове resolve или на "rejected" («выполнено
// 	с ошибкой») при вызове reject.
// - result («результат») — вначале undefined, далее изменяется на value при 
// 	вызове resolve(value) или на error при вызове reject(error)

let promise = new Promise( function(resolve, reject) {
  // наша функция-исполнитель (executor), неважно асинхронная или синхронная;
  // она должна вызвать один из этих колбэков (сработает первый вызванный):
  	// resolve(value) — если работа завершилась успешно, с результатом value.
  	// reject(error) — если произошла ошибка, error – объект ошибки. 

  	// value и error могут быть любым типом данных
});

// Потребители (подписчики) завершенного промиса могут использовать его результат или 
// ошибку с помощью таких методов обработчиков: then, catch, finally. Они находятся в 
// прототипе встроенного класса Promise. 

promise.then(
  function(result) { /* обработает успешное выполнение */ },
  function(error) { /* обработает ошибку */ }
);

// Если мы хотели бы только обработать ошибку, то можно использовать null в качестве 
// первого аргумента. Или можно воспользоваться методом .catch(errorHandlingFunction),
// который сделает тоже самое. Вызов .catch(f) – это сокращённый вариант .then(null, f)
promise.catch( function(error) { /* обработает ошибку */ } );

promise.finally( () => {
		console.log(`не имеет аргументов, не предназначен для обработки результата промиса.
								 Его задача выполнить какое то действие (например остановки индикатора 
								 загрузки). Обработчик finally «пропускает» результат или ошибку дальше, 
								 к последующим обработчикам`) 
	}
);

// Если обработчик в .then (или в catch) возвращает промис, последующие элементы 
// цепочки ждут, пока этот промис выполнится. Когда это происходит, результат его 
// выполнения (или ошибка) передаётся дальше и обрабатывается (или выпадет наружу);
// Так же если коллбэк в .then (или в catch) возвращает любой тип данных, то он 
// передаётся дальше и обрабатывается следующими обработчиками.

// Если мы бросим ошибку (throw) в промисе или обработчике (.then), то промис будет 
// считаться отклонённым, и управление перейдёт к ближайшему обработчику ошибок.
// Это происходит для всех ошибок, не только для тех, которые вызваны оператором throw.
// Но если мы бросим или допустим ошибку в промисе/then внутри setTimeout, то она не
// обработается следующим обработчиком из-за асинхронности


	// Promise API (5 статических методов):

// после завершается самого долгого промиса возвращает массив результатов переданных 
// промисов в той же последовательности. Если в перданном промисе ошибка, то остальные 
// игнорятся и возвращается ошибка. в массив могут передаваться не обязательно промисы 
Promise.all([...промисы...])

// всегда ждёт завершения всех промисов (даже завершенных с ошибкой);
// В массиве результатов будет:
// {status:"fulfilled", value:результат} для успешных завершений,
// {status:"rejected", reason:ошибка} для ошибок
Promise.allSettled([...промисы...])

// Метод очень похож на Promise.all, но ждёт только первый (самый быстрый) промис, из  
// которого возвращает результат (или ошибку)
Promise.race([...промисы...]);

// возвращает успешно выполненный промис с результатом value (почти не используется)
// То же самое, что: let promise = new Promise(resolve => resolve(value));
Promise.resolve(value) 

// возвращает промис, завершённый с ошибкой error (почти не используется)
Promise.reject(error)