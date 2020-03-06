			
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




			// Задача 4

// Дан массив объектов. Отсортировать товары: 
// 1) по количеству отзывов.
// 2) по цене (если цены две, то брать newUan)

let phones = [ 
	{ratingRevievs: "264 отзыва", price: {oldUan: "4 333 грн", newUan: "3 799 грн"}, name: "Motorola MOTO G4 (XT1622) Black"}, 
	{ratingRevievs: "1355 отзывов", price: "4 999 грн", name: "Samsung Galaxy J7 J700H/DS Black + карта памяти 16гб"}, 
	{ratingRevievs: "426 отзывов", price: "5 199 грн", name: "Samsung Galaxy J5 (2016) J510H/DS Black + защитное стекло + чехол!"}, 
	{ratingRevievs: "403 отзыва", price: "4 349 грн", name: "Xiaomi Redmi Note 4X 3/32GB Black"}, 
	{ratingRevievs: "488 отзывов", price: "6 199 грн", name: "Samsung Galaxy J7 (2016) J710F/DS Gold + защитное стекло + чехол!"}, 
	{ratingRevievs: "198 отзывов", price: {oldUan: "3 495 грн", newUan: "2 995 грн"}, name: "Lenovo K5 (A6020a40) Silver"}, 
	{ratingRevievs: "352 отзыва", price: {oldUan: "9 799 грн", newUan: "7 999 грн"}, name: "Apple iPhone 5s 16GB Space Gray"}, 
	{ratingRevievs: "59 отзывов", price: "5 999 грн", name: "Nokia 5 Dual Sim Tempered Blue"}, 
	{ratingRevievs: "119 отзывов", price: "11 999 грн", name: "Samsung Galaxy A5 2017 Duos SM-A520 Black + карта памяти 128гб!"}, 
	{ratingRevievs: "1106 отзывов", price: "3 999 грн", name: "Samsung Galaxy J5 J500H/DS Black + чехол + защитное стекло!"}, 
	{ratingRevievs: "380 отзывов", price: "2 199 грн", name: "Huawei Y3 II Tiffany (White-Blue) + чехол + защитное стекло!"}, 
	{ratingRevievs: "86 отзывов", price: {oldUan: "24 999 грн", newUan: "22 999 грн"}, name: "Samsung Galaxy S8 64GB Midnight Black"}, 
	{ratingRevievs: "177 отзывов", price: "6 499 грн", name: "Huawei P8 Lite 2017 White + УМБ Huawei AP08Q + защитное стекло + чехол!"}, 
	{ratingRevievs: "347 отзывов", price: "4 299 грн", name: "Xiaomi Redmi 4X 3/32GB Black (Международная версия)"}, 
	{ratingRevievs: "709 отзывов", price: "2 799 грн", name: "Samsung Galaxy J1 2016 SM-J120H Black + защитное стекло + чехол!"}, 
	{ratingRevievs: "527 отзывов", price: "3 999 грн", name: "Huawei Y6 Pro Gold + чехол + защитное стекло!"}, 
	{ratingRevievs: "66 отзывов", price: "16 499 грн", name: "Apple iPhone 6s 32GB Gold"}, 
	{ratingRevievs: "14 отзывов", price: "11 499 грн", name: "Apple iPhone 6 32GB Space Gray"}, 
	{ratingRevievs: "70 отзывов", price: {oldUan: "7 399 грн", newUan: "5 999 грн"}, name: "Asus ZenFone 2 32GB (ZE551ML) Black"}, 
	{ratingRevievs: "45 отзывов", price: "4 299 грн", name: "Nokia 3 Dual Sim Silver White + сертификаты 500 грн!"}, 
	{ratingRevievs: "376 отзывов", price: "3 899 грн", name: "Meizu M3 Note 32GB Grey (Международная версия)"}, 
	{ratingRevievs: "111 отзывов", price: {oldUan: "9 999 грн", newUan: "7 999 грн"}, name: "Sony Xperia X Dual (F5122) White"}, 
	{ratingRevievs: "40 отзывов", price: "2 222 грн", name: "Lenovo Vibe C (A2020) Black + УМБ PowerPlant 5200 mAh в подарок!"}, 
	{ratingRevievs: "93 отзыва", price: "18 999 грн", name: "Apple iPhone 7 32GB Black"}, 
	{ratingRevievs: "33 отзыва", price: "16 999 грн", name: "Huawei P10 4/32GB Black + сертификат 2500грн + чехол Huawei Smart"}, 
	{ratingRevievs: "71 отзыв", price: {oldUan: "2 399 грн", newUan: "1 999 грн"}, name: "LG K5 X220ds Gold"}, 
	{ratingRevievs: "39 отзывов", price: "2 995 грн", name: "Lenovo C2 Power (K10a40) Black"}, 
	{ratingRevievs: "156 отзывов", price: "2 599 грн", name: "Nous NS 5006 Gold"}, 
	{ratingRevievs: "40 отзывов", price: "19 689 грн", name: "LG G6 Mystic White"}, 
	{ratingRevievs: "24 отзыва", price: "5 995 грн", name: "Motorola MOTO G5 (XT1676) Grey"}, 
	{ratingRevievs: "7 отзывов", price: {oldUan: "10 999 грн", newUan: "9 999 грн"}, name: "HTC One X10 Dual Sim Silver"}, 
	{ratingRevievs: "18 отзывов", price: {oldUan: "5 999 грн", newUan: "4 999 грн"}, name: "Sony Xperia L1 Dual Black"}
]

function sortByRewievs(arr) {
	// чтобы клонировать (глубокое клонирование) исходный массив можно применить такой прием 
	// важно что JSON поддерживает только объекты, массивы, строки, числа, true/false и null
	// + этот прием нельзя использовать для копирования методов объекта (JSON не поддерживает функции)
	let clone = JSON.parse(JSON.stringify(arr))

	clone.forEach(item => {
		// проходимся по всем свойствам ratingRevievs меняя их значение на числовые, используя при этом 
		// метод строки replace() - заменяет все не числа пустой строкой (с помощью шаблона регулярного выражения)
		item.ratingRevievs = +item.ratingRevievs.replace(/\D/g, '')
	})

	// сортируем по рейтингу
	clone.sort((a,b) => {
		return a.ratingRevievs > b.ratingRevievs ? 1 : -1
	})

	// очищаем результат
	document.querySelector('.sort_result').innerHTML = ''

	// выводим результат
	clone.forEach((item) => {
		document.querySelector('.sort_result').innerHTML += `
			<p>отзывов: ${item.ratingRevievs}</p>
			<hr />
		`
	})
}

function sortByPrice(arr) {

	let clone = JSON.parse(JSON.stringify(arr))

	clone.forEach(item => {
		if (typeof item.price == 'string') {
			item.price = +item.price.replace(/\D/g, '')
		} else if (typeof item.price == 'object') {
			item.price = +item.price.newUan.replace(/\D/g, '')
		}
	})

	// сортируем по цене
	clone.sort((a,b) => {
		return a.price > b.price ? 1 : -1
	})

	// очищаем результат
	document.querySelector('.sort_result').innerHTML = ''

	// выводим результат
	clone.forEach((item) => {
		document.querySelector('.sort_result').innerHTML += `
			<p>цена: ${item.price}</p>
			<p>отзывов: ${item.ratingRevievs}</p>
			<hr />
		`
	})
}

document.querySelector('.btn_sortByRewievs').addEventListener('click', () => sortByRewievs(phones))
document.querySelector('.btn_sortByPrice').addEventListener('click', () => sortByPrice(phones))

