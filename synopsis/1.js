					
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
__proto__ находится в Object.prototype, как и другие методы; В современном языке его заменяют
Object.create(proto, [descriptors])
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj, proto)
// Если установить F.prototype = null, то вновь созданный объект наследует от Object.prototype
// Мы можем создать "простейший" объект без прототипов, т.е без встроенных методов
Object.create(null)
// точная копия obj c тем же прототипом - «продвинутое» клонирование объекта 
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));



		/* Классы */

class MyClass {
  prop = value; // свойство объекта (value статично, в отличае от св-в из constructor)
  constructor(...) { // конструктор
    // ...
  }
  method(...) {} // метод
  get something(...) {} // геттер
  set something(...) {} // сеттер
}



		/* Методы массивов: */

самый простой способ очистить массив – это arr.length = 0;

Array.isArray(value) - <boolean>

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


Array.from() - принимает итерируемый объект или псевдомассив и делает из него «настоящий»



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
