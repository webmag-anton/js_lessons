
                                    /***  TRICKS  ***/

      // NUMBERS

// способ устраняющий неточность при округлении
num.toFixed(n) – <string> - округляет число до n знаков после запятой,
                            допускает неточность! ( 6.35.toFixed(1) == 6.3 )
Math.round(6.35 * 10) / 10 // 6.35 -> 63.5 -> 64(rounded) -> 6.4

// быстрое возведение в степень
console.log(2 ** 3); // Result: 8



      // ARRAYS

arr.length = 0  – самый простой способ очистить массив  
[1, 2, 3, 4, 5].length = 3 // превращает в  [1, 2, 3]

// делаем массив с уникальными значениями
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)]  // [1, 2, 3, 5]

// делаем объект из массива 
const users = [1, 2, 3, 4, 5]
const usersObject = {...users}  // { '0':1, '1':2, '2':3, '3':4, '4':5 }

// function Boolean(val) return only truthly values 
[1, 0, 2, null].filter(Boolean) // [1, 2]



      // Cloning

   // not-deep object

- Object.assign(dest, [src1, src2...]) // копирует св-ва {и строковые и символьные} всех объектов srcN в dest
// точная копия obj c тем же прототипом - «продвинутое» клонирование объекта 
- let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
- let obj2 = {...obj1}

   // not-deep array

- arr.concat()
- let arr2 = [...arr1]

   // deep

// этот прием нельзя использовать для копирования методов объекта (JSON не поддерживает функции)
- let clone = JSON.parse(JSON.stringify(obj/arr)) 



      // Misc (разное)

?? -  это логический оператор, который возвращает его правый операнд, когда его левый операнд имеет 
      значение null или undefined, а в противном случае возвращает его левый операнд; в отличае от ||, 
      возвращает его правый операнд не при любых ложных значениях, а только при null или undefined;
      удобно использовать как значение по умолчанию, если приемлимо получить параметры '' или 0


?. -  оператор optional chaining {опциональные цепочки} для исключения ошибок при обращению к 
      несуществующему свойству объекта; пример
const data = {
  user: {}
}
console.log(data.user.address.street) // Uncaught TypeError: Cannot read property 'street' of undefined
  // Чтобы не выкинуло ошибку, нужна проверка; можно ее сделать обычным способом:
const street = data && data.user && data.user.address && data.user.address.street;
console.log(street); // undefined
  // но лучше с помощью optional chaining - короче и понятней
console.log(data.user?.address?.street); // undefined


function getStatusColor (status) { // пример lookup maps - карты поиска
  return {
    success: 'green',
    warning: 'yellow',
    info: 'blue',
    error: 'red'
  }[status]
}
