											

					/*** properties and functions in js ***/


// Преобразование типов
преобразование значения к строке - String(value)
преобразование значения к числу  - Number(value)



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
В отсутствие методов Symbol.toPrimitive и 
valueOf, toString обработает все случаи 
преобразований к примитивам;
Методы должны возвращать примитив, а не объект



		/* Символы: */

Symbol.("name") - создание с именем

читаем символ из глобального реестра и записываем 
его в переменную; если символа не существует, 
то он будет создан с именем
let sym = Symbol.for("id")

принимает глобальный символ и возвращает его имя
Symbol.keyFor(sym) // id



		/* Строки: */

str.indexOf(substr, pos) - <number or -1> - поиск подстроки
str.includes(substr, pos) - <boolean>
str.slice(start [, end]) - получение подстроки без вырезания
str.codePointAt(pos) - возвращает код символа на позиции pos
String.fromCodePoint(code) - создаёт символ по его коду code



		/* Методы объектов: */

копирует свойства всех объектов srcN в dest,
не для глубокого клон-я (без вложенных объектов)
Object.assign(dest, [src1, src2, src3...]) 

Object.keys(obj) – возвращает массив ключей
Object.values(obj) – возвращает массив значений
Object.entries(obj) – возвращает массив пар [ключ, значение]

Object.getOwnPropertySymbols() - возвращает массив только символьных ключей



		/* Методы массивов: */

									Для добавления/удаления элементов

Array.isArray(value) - <boolean>

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

									Поиск в массиве

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

									Преобразование массива

let result = arr.map(function(item, index, array) {
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



		/* Методы	формата JSON: */

// Если объект имеет метод toJSON(), то он вызывается через JSON.stringify
JSON.stringify() - для преобразования объектов в JSON
JSON.parse() - для преобразования JSON обратно в объект

