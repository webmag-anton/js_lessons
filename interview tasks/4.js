                                             // Yandex

/* 
   1) sort odd numbers in array
   const arr = [2, 3, 7, 4, 6, 1, 5, 8, 9]

   sortOdd(arr) // [2, 1, 3, 4, 6, 5, 7, 8, 9] 
*/

// const arr = [2, 3, 7, 4, 6, 1, 5, 8, 9]

// function sortOdd(arr) {
//    const sortedOddArr = arr.filter(x => x % 2).sort((a, b) => b - a)
//    let result = arr.map(x => x % 2 ? sortedOddArr.pop() : x)
   
//    console.log(result)
//    return result
// }

// sortOdd(arr)



/* ---------------------------------------------------------- */



/* 
   2) RLE (архиватор)
   const inputStr = 'AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB'

   rle(inputStr)  // 'A4B3C2XYZD4E3F3A6B28'
*/

const inputStr = 'AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB'

function rle(str) {

   let prevSign = '',
       currentAmount = 1,
       finalStr = ''

   for (let sign of str) {
      if (sign == prevSign) {
         currentAmount++
      }
      else{
         // если один раз - не повторяется
         finalStr += prevSign + (currentAmount > 1 ? currentAmount : '')
         prevSign = sign
         currentAmount = 1
      }
   }
   // склеиваем последнюю часть
   finalStr += prevSign + (currentAmount > 1 ? currentAmount : '')

   console.log(finalStr)
   return finalStr
}

rle(inputStr)



/* ---------------------------------------------------------- */



/* 
   Сумма с произвольным количеством скобок.
   Напишите функцию sum, которая бы работала следующим образом:
   sum(1)(3)(6) == 10
*/

function sum(a) {

   let currentSum = a

   function f(b) {
      currentSum += b
      return f
   }

   f.toString = function() {
      return currentSum
   }

   return f
}
// преобразование к примитиву
console.log( sum(1)(3)(6) == 10 )   



/* ---------------------------------------------------------- */



/* 
   Поправить не меняя var на let в круглых скобках
*/

// const button = document.getElementById('button')

// for (var i = 0; i < 3; i++) {  // если не менять 

//    // var z = i    // не решит проблему, просто 3 раза выведется число 2, а не число 3 (если i); у var нет блочной области видимости
//    let x = i       // решит проблему, при клике выведется 1,2,3

//    button.addEventListener('click', function(e) {
//       console.log(x) // z
//    })
// }

// button.click()



/* ---------------------------------------------------------- */



// function Person(age) {
//    this.age = age;

//    setInterval(function() {
//        this.age++;
//    }, 1000);
// }

// const vasya = new Person(15);

// // выведет 15, т.к. у ф-ии в интервале потеря контекста
// setTimeout(() => {
//    console.log(vasya)
// }, 4000)



/* ---------------------------------------------------------- */



// function Person(name) {
//    this.name = name
// }

// const juan = new Person('Juan')

// Person.prototype = {
//    getName: function () {
//       return this.name
//    }
// }

// const pedro = new Person('Pedro')

// console.log(pedro.getName())
// // ошибка, на момент создания не было метода getName в прототипе
// console.log(juan.getName())  



/* ---------------------------------------------------------- */



// const numbers = []

// for (let i = 1; i <= 100; i++) {
//    if (i % 3 == 0 && i % 5 != 0) {
//       numbers.push('three')
//    } else if (i % 5 == 0 && i % 3 != 0) {
//       numbers.push('five')
//    } else if (i % 5 == 0 && i % 3 == 0) {
//       numbers.push('three-five')
//    } else {
//       numbers.push(i)
//    }
// }

// console.log(numbers)



/* ---------------------------------------------------------- */