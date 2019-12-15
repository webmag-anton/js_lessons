'use strict';


/* 1.3 Навигация по DOM-элементам */

// document.body.firstElementChild
// document.body.lastElementChild или document.body.children[1]
// document.body.lastElementChild.lastElementChild



// let table = document.body.firstElementChild;

// for (let i = 0; i < table.rows.length; i++) {
// 	let row = table.rows[i];
// 	row.cells[i].style.backgroundColor = 'red';
// }



// Array.from(document.body.children)
// 			.find(item => item.getAttribute("data-color") == "red")
// 			.style.backgroundColor = 'lightblue';




/* 1.4 */

// let table = document.getElementById('age-table');
// table.getElementsByTagName('label');
// table.querySelector('td');
// let formS = table.querySelector('form[name="seach"]');
// let inputs = form.querySelectorAll('input');
// inputs[inputs.length-1];




/* 1.5 */

// let list = document.body.querySelectorAll('ul > li')

// for (let item of list) {

// 	for (let node of item.childNodes){

// 		if (node.nodeType == 3){
// 			console.log(node)
// 		}
// 	}
// }


// let amount = document.body.querySelectorAll('li').length
// console.log(amount)




/* 1.6 */

// document.querySelector('[data-widget-name]').dataset.widgetName


// let links = document.querySelectorAll('a');
// // используем .getAttribute() вместо св-ва .href, т.к. свойство  
// // href – всегда полный URL, а нам нужно «оригинальное» значение!
// let filteredLinks = Array.from(links).filter( link => {
// 	return 	link.getAttribute('href').includes('://') && 
// 					!(link.getAttribute('href').startsWith('http://internal.com'))
// });

// for (let link of filteredLinks) {
// 	link.style.color = 'orange';
// }



/* 1.7 */


// let listPrompt = document.createElement('ul');

// while(true){
// 	let question = prompt('введите содержимое пункта', 'text');
// 	if (!question) break;

// 	let listItem = document.createElement('li');
// 	listItem.textContent = question;
// 	listPrompt.append(listItem);
// }

// document.body.append(listPrompt);




// let data = {
//   "Рыбы": {
//     "форель": {},
//     "лосось": {}
//   },

//   "Деревья": {
//     "Огромные": {
//       "секвойя": {},
//       "дуб": {}
//     },
//     "Цветковые": {
//       "яблоня": {},
//       "магнолия": {}
//     }
//   }
// };

// let container = document.getElementById('listFromObj');

// function createTree(container, obj) {
//   container.append( createTreeDom(obj) );
// }

// function createTreeDom(obj) {
//   // если нет дочерних элементов, то вызов возвращает undefined
//   // и элемент <ul> не будет создан
//   if (!Object.keys(obj).length) return;

//   // Т.к. есть, то создаем ul
//   let ul = document.createElement('ul');

//   // и проходимся по объекту
//   for (let key in obj) {
//     let li = document.createElement('li');
//     li.textContent = key;

//     // рекурсивно вызываем ф-ю для значения св-ва, 
//     // если пустой объект то не сработает (не создаст ul) 
//     // а если не пустой объект, то опять создаем ul... 
//     let childrenUl = createTreeDom(obj[key]);
//     if (childrenUl) {
//       li.append(childrenUl);
//     }

//     ul.append(li);
//   }

//   return ul;
// }

// createTree(container, data);





// let lis = document.getElementsByTagName('li');

// for (let li of lis) {
//   // получить количество всех <li> ниже этого <li>
//   let descendantsCount = li.getElementsByTagName('li').length;
//   if (!descendantsCount) continue;

//   // добавить непосредственно к текстовому узлу (добавить к тексту)
//   li.firstChild.data += ` [${descendantsCount}]`;
// }





// let calendar = document.getElementById('calendar')

// function createCalendar(elem, year, month) {	

// 	let table = document.createElement('table');
// 	table.innerHTML = `<thead>
// 											<tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th>
// 											<th>вс</th></tr>
// 										</thead>
// 										<tbody>
// 											<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
// 											<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
// 											<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
// 											<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
// 											<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
// 											<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
// 										</tbody>`

// 	let date = new Date(year, month);
// 	date.setDate(1)
// 	let firstDay = date.getDay();

// 	// пн начало, а не вс
// 	if (firstDay == 0) {
// 		firstDay = 7;
// 	}
// 	firstDay -= 1

// 	let one = 1;

// 	// вычисляем ко-во дней в месяце автоисправлением даты
// 	date.setMonth(month + 1, 0); 
// 	let last = date.getDate();

// 	// проходимся по рядам таблицы
// 	outer: for (let i = 0; i < table.tBodies[0].rows.length; i++){
// 		let j = firstDay;
// 		if(i > 0) j = 0; // для 2го ряда начинаем запись с понедельника
		
// 		// проходимся по ячейкам таблицы, начиная с дня недели для 1 числа месяца
// 		for (j; j < table.tBodies[0].rows[i].cells.length; j++) {
// 			table.tBodies[0].rows[i].cells[j].textContent = one++;
// 			if (one > last) break outer; // выходим из внешнего счетчика после последнего месяца
// 		}
// 	}
// 	// Если нужно, удаляем последний пустой ряд
// 	if (table.tBodies[0].rows[5].cells[0].textContent == '' ) table.tBodies[0].rows[5].remove()

// 	elem.append(table);
// }

// createCalendar(calendar, 2019, 11)