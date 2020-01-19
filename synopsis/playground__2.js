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



/* 2.4 */

// 2
let contents = document.querySelector('#contents')

contents.addEventListener('click', event => {
	// если клик не по ссылке, иле не по элементу внутри ссылки - отмена обработки
	if (!event.target.closest('a')) return;

	let question = confirm('Хотите покинуть страницу и перейти по ссылке?')
	if (!question) event.preventDefault()
	// если не нажмли на отмена, то произойдет дефолтное действие
})

// 3
let photorama = document.querySelector('.photorama')
let photorama_imgLarge = document.querySelector('.photorama-imgLarge')

photorama.addEventListener('click', event => {
	if ( event.target.tagName == 'IMG' && 
		   event.target.closest('.photorama-thumbsBox')) {

		let currentImg = event.target.getAttribute('src')
		photorama_imgLarge.setAttribute('src', currentImg)
	}
})



/* 3.1 */

let ul_mouse = document.querySelector('#ul_mouse')
let ul_mouseItems = document.querySelectorAll('#ul_mouse li')

ul_mouse.addEventListener('mousedown', e => {
	// отключаем выделение текста при зажатой кнопке с перемещением, а так же 
	// это предотвратит выделение при даблклике - это связанное событие
	e.preventDefault() 
})

ul_mouse.addEventListener('click', e => {
	if (e.target.tagName != 'LI') return;

	if ( e.ctrlKey || e.metaKey ) { // если зажата ctrl или Cmd (для macOS)
		e.target.classList.toggle('selected')
	} else {
		// у коллекции-псевдомассива элементов есть метод forEach()
		ul_mouseItems.forEach(function(item) {
			item.classList.remove('selected')
		})  
		e.target.classList.add('selected')
	}
})



/* 3.2 */

// 1
let house = document.querySelector('#house')
let tooltip;

let current;

house.addEventListener('mouseover', e => {
	let tooltipElem = e.target.closest('[data-tooltip]')
	// если навели на элемент без подсказки (или на его предка) - выходим
	if (!tooltipElem) return;

	// если предок элемента с подсказкой (на который мы навели последний раз) и 
	// предок вновь наведенного элемента являются одним и тем же элементом - выходим
	if (tooltipElem == current) return

	// записываем элемент на который навели
	current = tooltipElem;

	createTooltip(tooltipElem)
})

house.addEventListener('mouseout', e => {
	// если вывели курсор из элемента без подсказки (или из его предка) - выходим
	if (!e.target.closest('[data-tooltip]')) return;
	// если указатель не ушел за пределы окна браузера (e.relatedTarget != null) и 
	// если предок элемента с подсказкой (из которого мы выводим курсор) и предок
	// элемента на который наводим являются одним и тем же элементом - выходим
	if ( e.relatedTarget && e.target.closest('[data-tooltip]') == 
		   e.relatedTarget.closest('[data-tooltip]') ) return;

	tooltip.remove() // удаляем подсказку
	// очищаем текщий элемент (что б при вовторном наведении на тот же элемент 
	// создавалась подсказка (например после повторного наведения на дом) )
	current = null
})


function createTooltip(tooltipElem) {
	tooltip = document.createElement('div')
	tooltip.className = 'tooltip-house'
	tooltip.innerHTML = tooltipElem.dataset.tooltip
	document.body.prepend(tooltip)

	let coords = tooltipElem.getBoundingClientRect();

	let top = coords.top - tooltip.offsetHeight - 5;
	if (coords.top < tooltip.offsetHeight + 5) top = coords.bottom + 5;
	let left =  coords.left + (coords.width - tooltip.offsetWidth) / 2;
	if (left < 0) left = 0

	tooltip.style.top = top + 'px';
	tooltip.style.left = left + 'px';
}


// 2
let clock = document.querySelector('.clock')
let tooltip_smart = document.createElement('div')
tooltip_smart.className = 'tooltip_smart'
tooltip_smart.innerHTML = 'tooltip_smart'
document.body.prepend(tooltip_smart)

let coords = clock.getBoundingClientRect();
tooltip_smart.style.top = coords.bottom + 5 + 'px'
tooltip_smart.style.left = coords.left + 'px'
tooltip_smart.hidden = true

let interval

// т.к нам не нужно обрабатывать переход на внутренние элементы часов, а только
// движение курсора над часами вцелом, то удобней использовать mouseenter/mouseleave
clock.addEventListener('mouseenter', e => {
	// начальные координаты при наведении курсора
	let startX = e.clientX
	let startY = e.clientY
	// последние координаты, вычисляемые каждые 100 мс
	let lastX, lastY

	// после наведения на элемент следим за движением мыши
	clock.addEventListener('mousemove', event => {
		lastX = event.clientX			
		lastY = event.clientY			
	})

	// каждые 100 мс проверяем пройденное расстояние
	interval = setInterval(function() {
		// гипотенуза (расстояние) равна корню от суммы квадратов катетов
		let deltaX = lastX - startX;
		let deltaY = lastY - startY;
		let catetsSum = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
		let hypotenuse = Math.pow(catetsSum, 0.5).toFixed(1) 
		console.log(`Скорость:  ${hypotenuse} px/100ms`)

		// если скорость перемещения меньше 10px/100ms, то показываем 
		// подсказку и останавливаем вычисления 
		if(hypotenuse < 10) {
			tooltip_smart.hidden = false
			clearInterval(interval) // останавливаем вычисления 
		}

		// записываем последние координаты как стартовые
		startX = lastX
		startY = lastY

	}, 100)

})

clock.addEventListener('mouseleave', e => {
	clearInterval(interval)
	// если была показана подсказка - прячем
	if (!tooltip_smart.hidden) {
		tooltip_smart.hidden = true
	}
})



/* 3.3 */

// 1
let range = document.querySelector('.range')
let rangeBar = document.querySelector('.range-bar')

rangeBar.ondragstart = function() {
  return false; // отмена браузерного ondragstart
};

rangeBar.addEventListener('mousedown', e => {
	e.preventDefault(); // предотвратить запуск выделения (действие браузера)
	// вычисляем изначальный сдвиг относительно указателя мыши
	let shiftX = e.clientX - rangeBar.getBoundingClientRect().left

	function rangeBarBase(clientX) {
		rangeBar.style.left = `${clientX - range.getBoundingClientRect().left - shiftX}px`

		if (rangeBar.getBoundingClientRect().left < range.getBoundingClientRect().left) {
			rangeBar.style.left = '0'
		}
		if (rangeBar.getBoundingClientRect().right > range.getBoundingClientRect().right) {
			rangeBar.style.left = `calc(100% - ${rangeBar.getBoundingClientRect().width}px)`
		}
	}

	function rangeBarMove(e) {
		rangeBarBase(e.clientX)
	}
	document.addEventListener('mousemove', rangeBarMove)

	// удаляем обработчик отпускания мышки после отпускания
	function onMouseUp() {
		document.removeEventListener('mousemove', rangeBarMove)
		document.removeEventListener('mouseup', onMouseUp)
		console.log('up!')
	}
	document.addEventListener('mouseup', onMouseUp)

})

// 2
document.addEventListener('mousedown', e => {
	if (!e.target.classList.contains('draggable')) return;

	let hero = e.target

	e.preventDefault(); // предотвратить запуск выделения (действие браузера)
	hero.ondragstart = function(e) {
		hero.preventDefault(); // отмена браузерного ondragstart
	}

	// вычисляем изначальный сдвиг относительно указателя мыши
	let shiftX = e.clientX - hero.getBoundingClientRect().left
	let shiftY = e.clientY - hero.getBoundingClientRect().top

	let scrollbarRightWidth = window.innerWidth - document.documentElement.clientWidth
	let scrollbarBottomHeight = window.innerHeight - document.documentElement.clientHeight

	function heroMove(e) {
		hero.style.left = `${e.clientX - shiftX}px`
		hero.style.top = `${e.clientY - shiftY}px`
		hero.style.position = 'fixed'

		if (hero.getBoundingClientRect().left < 0) hero.style.left = '0'
		if (hero.getBoundingClientRect().left > 
				window.innerWidth - hero.getBoundingClientRect().width - scrollbarRightWidth) {
			hero.style.left = `${window.innerWidth - hero.getBoundingClientRect().width 
												 - scrollbarRightWidth}px`
		} 
		if (hero.getBoundingClientRect().top < 0) {
			hero.style.top = '0'
			window.scrollBy(0, -20) // прокрутка страницы вверх
		} 
		if (hero.getBoundingClientRect().top > 
				window.innerHeight - hero.getBoundingClientRect().height - scrollbarBottomHeight) {
			hero.style.top = `${window.innerHeight - hero.getBoundingClientRect().height
											  - scrollbarBottomHeight}px`
			window.scrollBy(0, 20) // прокрутка страницы вниз
		}
	}
	document.addEventListener('mousemove', heroMove)

	function mouseUp() {
		document.removeEventListener('mousemove', heroMove)
		document.removeEventListener('mouseup', mouseUp)
		hero.ondragstart = null
	}
	document.addEventListener('mouseup', mouseUp)
})



/* 3.4 */

function runOnKeys(func, ...codes) {
	let pressed = new Set();

	document.addEventListener('keydown', function(event) {
		pressed.add(event.code);

    for (let code of codes) { // все ли клавиши из набора нажаты?
    	if (!pressed.has(code)) {
    		return;
    	}
    }

    // во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
    // при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
    // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
    pressed.clear();

    func();
  });

	document.addEventListener('keyup', function(event) {
		pressed.delete(event.code);
	});
}

runOnKeys( () => alert('welcome'), 'KeyZ', 'KeyX' )



/* 3.5 */

// 1
// window.addEventListener('scroll', (e) => {
// 	let scrollHeight = Math.max(
// 		document.body.scrollHeight, document.documentElement.scrollHeight,
// 		document.body.offsetHeight, document.documentElement.offsetHeight,
// 		document.body.clientHeight, document.documentElement.clientHeight
// 	)

// 	if (window.pageYOffset >= scrollHeight - window.innerHeight - 30) {
// 		let scrollTime = document.createElement('div')
// 		document.body.append(scrollTime)
// 		let currentDate = new Date();

// 		scrollTime.innerHTML = `${currentDate.getHours()} : 
// 														${currentDate.getMinutes()} : 
// 														${currentDate.getSeconds()}`
// 	}
// })



/* 4.1 */

// let selectGenres = document.querySelector('#genres')
// let optionSelected = selectGenres.options[selectGenres.selectedIndex]
// console.log(selectGenres.value, optionSelected.text)

// let aditionalOption = new Option('Классика', 'classic', true, true)
// selectGenres.append(aditionalOption)



/* 4.2 */

// 1
let divView = document.querySelector('.view')

let textareaEdit = document.createElement('textarea')
textareaEdit.className = 'edit'

let handleViewClick = function() {
	textareaEdit.value = this.textContent
	this.replaceWith(textareaEdit) // replaceWith не удаляет this => querySelector находит .view
	textareaEdit.focus()

	textareaEdit.addEventListener('blur', function() {
		divView.textContent = this.value
		this.replaceWith(divView)
		divView.focus()
	})

	textareaEdit.addEventListener('keydown', function(e) {
		if (e.code == 'Enter') {
			this.blur()
		}
	})
}

divView.addEventListener('click', handleViewClick)


// 2

// my version
let baguaTable = document.querySelector('#bagua-table')

let handlerTableClick = function(e) {

		let currentTarget = e.target
		let currentTD = currentTarget.closest('td')

		// если кликнули по ячейке или по вложенному в нее тегу (кроме textarea и кнопок)
		if ( currentTD && currentTarget.tagName != 'TEXTAREA' && 
				 !currentTarget.closest('.bagua-buttons') ) {

			// запоминаем текущее содержимое, до редактирования
			let currentHTML = currentTD.innerHTML

			// создаем textarea с содержимым как у ячейки и кладем внутрь пустого td
			let textarea = document.createElement('textarea')
			textarea.className = 'bagua-textarea'
			textarea.value = currentTD.innerHTML
			textarea.style.cssText = `position: absolute;
																left: 0;
																top: 0;
																width: 100%;
																height: 100%;`
			currentTD.innerHTML = ''
			currentTD.append(textarea)
			textarea.focus()

			// добавляем кнопки внутрь ячейки (за textarea) и позиционируем под ячейкой
			let bagua_buttons = document.createElement('div')
			bagua_buttons.className = 'bagua-buttons'
			bagua_buttons.style.cssText = `position: absolute;
																		left: 0;
																		top: 100%;
																		z-index: 1`

			let bagua_button_ok = document.createElement('button')
			bagua_button_ok.className = 'bagua-button-ok'
			bagua_button_ok.textContent = 'OK'
			let bagua_button_cancel = document.createElement('button')
			bagua_button_cancel.className = 'bagua-button-cancel'
			bagua_button_cancel.textContent = 'CANCEL'

			bagua_buttons.append(bagua_button_ok)
			bagua_buttons.append(bagua_button_cancel)

			currentTD.append(bagua_buttons)

			// удаляем обработчик, что б во время редактирования textarea не редактировать др ячейки
			baguaTable.removeEventListener('click', handlerTableClick)

			
			let handlerOkClick = function() {
					currentTD.innerHTML = textarea.value
					// восстанавливаем обработчик таблицы
					baguaTable.addEventListener('click', handlerTableClick)
					// удаляем обработчик кнопки OK
					bagua_button_ok.removeEventListener('click', handlerOkClick)
				}
			// если кликаем по кнопке OK
			bagua_button_ok.addEventListener('click', handlerOkClick)

			let handlerCancelClick = function() {
					currentTD.innerHTML = currentHTML
					// восстанавливаем обработчик таблицы
					baguaTable.addEventListener('click', handlerTableClick)
					// удаляем обработчик кнопки CANCEL
					bagua_button_cancel.removeEventListener('click', handlerCancelClick)
				}
			// если кликаем по кнопке CANCEL
			bagua_button_cancel.addEventListener('click', handlerCancelClick)

		}
	}

baguaTable.addEventListener('click', handlerTableClick)

															// Или

// let table = document.getElementById('bagua-table');

// let editingTd;

// table.onclick = function(event) {

//   // 3 возможных цели
//   let target = event.target.closest('.edit-cancel,.edit-ok,td');

//   if (!table.contains(target)) return;

//   if (target.className == 'edit-cancel') {
//     finishTdEdit(editingTd.elem, false);
//   } else if (target.className == 'edit-ok') {
//     finishTdEdit(editingTd.elem, true);
//   } else if (target.nodeName == 'TD') {
//     if (editingTd) return; // уже редактируется

//     makeTdEditable(target);
//   }

// };

// function makeTdEditable(td) {
//   editingTd = {
//     elem: td,
//     data: td.innerHTML
//   };

//   td.classList.add('edit-td'); // td в состоянии редактирования, CSS применятся к textarea внутри ячейки

//   let textArea = document.createElement('textarea');
//   textArea.style.width = td.clientWidth + 'px';
//   textArea.style.height = td.clientHeight + 'px';
//   textArea.className = 'edit-area';

//   textArea.value = td.innerHTML;
//   td.innerHTML = '';
//   td.appendChild(textArea);
//   textArea.focus();

//   td.insertAdjacentHTML("beforeEnd",
//     '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
//   );
// }

// function finishTdEdit(td, isOk) {
//   if (isOk) {
//     td.innerHTML = td.firstChild.value;
//   } else {
//     td.innerHTML = editingTd.data;
//   }
//   td.classList.remove('edit-td');
//   editingTd = null;
// }



// 3
let mouse = document.querySelector('#mouse')
mouse.style.cssText = `position: relative;
											 display: inline-block;`
mouse.tabIndex = 0

mouse.addEventListener('focus', function() {
	mouse.addEventListener('keydown', e => {
		if (e.code == 'ArrowUp') {
			e.preventDefault() // отменяем прокрутку страницы
			this.style.top = `${(parseInt(this.style.top) || 0) - 30}px`
		}
		if (e.code == 'ArrowDown') {
			e.preventDefault() // отменяем прокрутку страницы
			this.style.top = `${(parseInt(this.style.top) || 0) + 30}px`
		}
		if (e.code == 'ArrowLeft') {
			e.preventDefault() // отменяем прокрутку страницы
			this.style.left = `${(parseInt(this.style.left) || 0) - 30}px`
		}
		if (e.code == 'ArrowRight') {
			e.preventDefault() // отменяем прокрутку страницы
			this.style.left = `${(parseInt(this.style.left) || 0) + 30}px`
		}
	})
})