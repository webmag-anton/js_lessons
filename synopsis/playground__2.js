'use strict';


/* 1.3  Навигация по DOM-элементам */

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




/* 1.4  Поиск: getElement*, querySelector* */

// let table = document.getElementById('age-table');
// table.getElementsByTagName('label');
// table.querySelector('td');
// let formS = table.querySelector('form[name="seach"]');
// let inputs = form.querySelectorAll('input');
// inputs[inputs.length-1];




/* 1.5  Свойства узлов: тип, тег и содержимое */

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




/* 1.6  Атрибуты и свойства */

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



/* 1.7  Изменение документа */


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





/* 1.8  Стили и классы */


// function showNotification(options) {
// 	let notif = document.createElement('div');
// 	notif.className = `notification ${options.className}`;
// 	notif.textContent = `${options.html}`;
// 	notif.style.cssText = ` 
// 												position: fixed;
// 												top: ${options.top}px;
// 												right: ${options.right}px;
// 												width: 250px;
// 												background-color: green;
// 												color: #fff;
// 												`
// 	document.body.append(notif);

// 	setInterval(() => notif.remove(), 1500)
// }

// // показывает элемент с текстом "Hello" рядом с правой верхней частью окна.
// showNotification({
//   top: 10, // 10px от верхней границы окна (по умолчанию 0px)
//   right: 10, // 10px от правого края окна (по умолчанию 0px)
//   html: "Hello!", // HTML-уведомление
//   className: "welcome" // дополнительный класс для div (необязательно)
// });




/* 1.9  Размеры и прокрутка элементов */

// 1
// let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;

// 2 (без border)
// let scrollBarWidth = elem.offsetWidth - elem.clientWidth;


// document.documentElement.style.color = 'red'
// let computedObj = getComputedStyle(document.body)
// // style.display для body не покажет ничего, т.к не задан явно, но  
// // вычислится с помощью getComputedStyle
// console.log(document.documentElement.style.color, computedObj.display, computedObj.color)



/* 1.10 */

// 1
// elem.getBoundingClientRect().left
// elem.getBoundingClientRect().top

// elem.getBoundingClientRect().right
// elem.getBoundingClientRect().bottom

// elem.getBoundingClientRect().left + elem.clientLeft
// elem.getBoundingClientRect().top + elem.clientTop

// elem.getBoundingClientRect().right - elem.clientLeft
// elem.getBoundingClientRect().bottom - elem.clientTop


// 2
// function positionAt(anchor, position, elem) {
// 	document.body.style.position = 'relative';
// 	elem.style.position = 'absolute';

// 	if (position == 'top') {
// 		elem.style.left = getBoundingClientRect().left + window.pageXOffset;
// 		elem.style.top = getBoundingClientRect().top + window.pageYOffset - elem.offsetHeight;
// 	} else if (position == 'right') {
// 		elem.style.left = getBoundingClientRect().left + window.pageXOffset + elem.offsetWidth;
// 		elem.style.top = getBoundingClientRect().top + window.pageYOffset;
// 	} else if (position == 'bottom') {
// 		elem.style.left = getBoundingClientRect().left + window.pageXOffset;
// 		elem.style.top = getBoundingClientRect().bottom + window.pageYOffset;
// 	}
// }



/* 2.1 */

// 1
// const button = document.querySelector('#button')
// const text = document.querySelector('#text')
// button.addEventListener('click', function() {
// 	text.style.display = 'none'
// })

// 4
document.body.style.minHeight = '150vh'
const field = document.querySelector('#field')
const ball = document.querySelector('#ball')
const ballRadius = parseInt(getComputedStyle(ball).width) / 2

field.addEventListener('click', function(event) {
	if (event.clientX < (this.getBoundingClientRect().left + this.clientLeft + ballRadius)) { 
		ball.style.left = `0`
	} else if (event.clientX > (this.getBoundingClientRect().right - this.clientLeft - ballRadius)){
		ball.style.left = `calc(100% - ${ballRadius*2}px)`
	} else {
		ball.style.left = `${event.clientX - this.getBoundingClientRect().left -
										  this.clientLeft - ballRadius}px`
	}
	if (event.clientY < (this.getBoundingClientRect().top + this.clientTop + ballRadius)) {
		ball.style.top = `0`
	} else if (event.clientY > (this.getBoundingClientRect().bottom - this.clientTop - ballRadius)){
		ball.style.top = `calc(100% - ${ballRadius*2}px)`
	} else {
		ball.style.top =  `${event.clientY - this.getBoundingClientRect().top -
										  this.clientTop - ballRadius}px`
	}
})

// 7
const carouselList = document.querySelector('.Carousel-list')
const carouselItem = document.querySelectorAll('.Carousel-item')
const carouselBtnLeft = document.querySelector('.Carousel-left')
const carouselBtnRight = document.querySelector('.Carousel-right')

const itemWidth = 200
const itemsPerClick = 3
let carouselPosition = 0

carouselBtnLeft.addEventListener('click', () => {
	carouselPosition += itemWidth*itemsPerClick
	carouselPosition = Math.min(carouselPosition, 0)	
	carouselList.style.marginLeft = `${carouselPosition}px`
})
carouselBtnRight.addEventListener('click', () => {
	carouselPosition -= itemWidth*itemsPerClick
	carouselPosition = Math.max( carouselPosition, 
															 -itemWidth*(carouselItem.length - itemsPerClick) )	
	carouselList.style.marginLeft = `${carouselPosition}px`
})



/* 2.3 */

// 1
// let container = document.getElementById('container')
// container.addEventListener('click', function(event){
// 	let elem = event.target
// 	if(!elem.classList.contains('remove-button')) return;
// 	elem.closest('.pane').hidden = true
// })


// 3
let grid = document.getElementById('grid')
let gridTbody = document.querySelector('#grid tbody')
let gridTh = document.querySelectorAll('#grid tr th')
let gridRows = document.querySelectorAll('#grid tbody tr')

grid.addEventListener('click', function(event) {
	// Если кликнули не по th - выходим
	if( event.target.tagName != 'TH' ) return

	// Определяем тип сортировки и индекс колонки для 
	// сортировки и затем сортируем
	let numIndex, strIndex;

	if( event.target.dataset.type == 'number' ) {
		// cellIndex – номер ячейки в строке <tr>
		numIndex = event.target.cellIndex

		console.log(`числовая сортировка по столбцу номер: ${numIndex}`)
		// Сортируем массив элементов, получив его из псевдомассива
		let sortedRows = Array.from(gridRows).sort( (a,b) => {
			return a.querySelectorAll('td')[numIndex].textContent - 
						 b.querySelectorAll('td')[numIndex].textContent 
		})
		// Вставляем отсортированный массив оператором spread (можно не удалять
		// содержимое tbody, т.к если добавить существующий элемент, то он вырежется)
		gridTbody.append(...sortedRows)
	}


	if( event.target.dataset.type == 'string' ) {
		strIndex = event.target.cellIndex

		console.log(`строковая сортировка по столбцу номер: ${strIndex}`)
		let sortedRows = Array.from(gridRows).sort( (a,b) => {
			return  a.querySelectorAll('td')[strIndex].textContent > 
							b.querySelectorAll('td')[strIndex].textContent ? 1 : -1;
		})
		gridTbody.append(...sortedRows)
	}

})

//4
// let tooltipElem;

// document.onmouseover = function(event) {
// 	let target = event.target;

//   // если у нас есть подсказка...
//   let tooltipHtml = target.dataset.tooltip;
//   if (!tooltipHtml) return;

//   // ...создадим элемент для подсказки
//   tooltipElem = document.createElement('div');
//   tooltipElem.className = 'tooltip';
//   tooltipElem.innerHTML = tooltipHtml;
//   document.body.append(tooltipElem);

//   // спозиционируем его сверху от аннотируемого элемента (top-center)
//   let coords = target.getBoundingClientRect();

//   let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
//   if (left < 0) left = 0; // не заезжать за левый край окна

//   let top = coords.top - tooltipElem.offsetHeight - 5;
//   if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
//   	top = coords.top + target.offsetHeight + 5;
//   }

//   tooltipElem.style.left = left + 'px';
//   tooltipElem.style.top = top + 'px';
// };

// document.onmouseout = function(e) {
// 	if (tooltipElem) {
// 		tooltipElem.remove();
// 		tooltipElem = null;
// 	}
// };