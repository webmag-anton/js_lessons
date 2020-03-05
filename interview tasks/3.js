			
			// Задача 1

// Реализовать функцию, которая находит разницу в массивах и возвращает ее
// Порядок возвращаемых элментов не важен

function arrayDifference(arr1, arr2) {
  // const uniqueArr = []
  // arr1.forEach(item => {
  //   if ( !arr2.includes(item) ) uniqueArr.push(item)
  // })
  // arr2.forEach(item => {
  //   if ( !arr1.includes(item) ) uniqueArr.push(item)
  // })
  // return uniqueArr

	// или

	return arr1.concat(arr2).filter(item => !arr1.includes(item) || !arr2.includes(item) )
}

console.log( arrayDifference(['javascript', 'is', 'awesome'], ['javascript', 'awesome']) )
// ['is']
console.log( arrayDifference([1, 2, 3, 4, 5], [3, 4, 2, 7]) )
// [1, 5, 7]



			// Задача 2

// Релизовать функцию, удаляющую элементы из массива
// Сделать это минимум 2мя способами

// function destroyer(array, ...args) {
//   return array.filter(item => !args.includes(item))
// }

const destroyer = (a, ...args) => a.filter(i => !args.includes(i))

console.log(destroyer([1, 2, 3, 4, 5, 6, 7], 1, 3, 5, 6))
// [2, 4, 7]
console.log(destroyer(['this', 'is', 'simple', 'algorithm'], 'this', 'is'))
// ['simple', 'algorithm']



			// Задача 3

// Проверить, если второй параметр является true для каждого элемента коллекции
// Если у всех элементов он truthy (проходит проверку в if), то функция возвращает true
// Иначе - false
// Найдите минимум 2 способа решения

function isEverythingTruthy(collection, check) {
	// let i = 0

	// collection.forEach(item => {
	// 	if ( item[check] ) i++
	// })

	// return collection.length == i

	// или

	return collection.every(i => i[check])
}

console.log( isEverythingTruthy([{name: 'Oleg', age: 25}, {name: 'Elena', age: 21}, {name: 'Victor', age: 12}], 'age') ) // true
console.log( isEverythingTruthy([{car: 'Ford', owner: 'Oleg'}, {car: 'Audi', owner: null}, {car: 'BMW', owner: 'Amazon'}], 'owner') ) // false
