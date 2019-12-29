

					/*** Браузер: документ, события, интерфейсы ***/



		// Навигация по DOM-элементам
			
<html> - document.documentElement
<head> - document.head
<body> - document.body

// Коллекция childNodes содержит список всех детей, включая текстовые узлы. 
// childNodes похож на массив. На самом деле это не массив, а коллекция – особый 
// перебираемый объект-псевдомассив ( можно перебрать в for..of, есть forEach() ).  
// Можно использовать Array.from() для создания массива из него.


// Получив DOM-узел, мы можем перейти к его ближайшим соседям используя  
// навигационные ссылки. Есть два основных набора ссылок:

// 	- Для всех узлов (теги, текст, комментарии...): 
parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling
// 	- Только для узлов-элементов (тегов): 
parentElement, children, firstElementChild, lastElementChild, 
previousElementSibling, nextElementSibling



		// Основный методы поиска элементов в DOM (elem.method - ищет внутри elem):

elem.querySelector(css) - возвращает первый элемент, соответствующий данному CSS-селектору								
elem.querySelectorAll(css) - возвращает все элементы, удовлетворяющие CSS-селектору						 
document.getElementById(id) - возвращает элемент c id						
elem.getElementsByClassName(class) - возвращает элементы, которые имеют данный CSS-класс	
document.getElementsByName(name) - возвращает элементы с заданным атрибутом name			
elem.getElementsByTagName(tag) - ищет элементы с данным тегом и возвращает их коллекцию				
	
elem.matches(css) - <boolean> - проверяет, удовлетворяет ли elem CSS-селектору
elem.closest(css) - ищет ближайшего предка включая себя, соответствующего CSS-селектору
elemA.contains(elemB) - вернёт true, если elemB находится внутри elemA



		// Главные свойства DOM-узла:

node/elem.nodeType == 1 для узлов-элементов, 3 для текстовых, 9 для объектов документа
node/elem.nodeName/tagName - только для чтения
elem.innerHTML - внутреннее HTML-содержимое узла-элемента;
elem.outerHTML - внешнее HTML-содержимое узла-элемента - включая elem;
node.data - cодержимое узла-неэлемента: текста, комментария;
elem.textContent - читает тест без учета тегов; записывает «как текст», даже если есть теги
elem.hidden - если значение true, делает то же самое, что и CSS display:none



		// Атрибуты и свойства

// Атрибуты – это то, что написано в HTML; свойства – это то, что находится в 
// DOM-объектах. Значением атрибута может быть только строка, а свойства - любой тип. 
// У св-ва имя регистрозависимо, а у атрибута - нет
// В большинстве ситуаций предпочтительнее использовать DOM-свойства

		// Методы для работы с атрибутами:

elem.hasAttribute(name) – проверить на наличие
elem.getAttribute(name) – получить значение
elem.setAttribute(name, value) – установить значение
elem.removeAttribute(name) – удалить атрибут
elem.attributes – это коллекция всех атрибутов

// атрибуты «data-...» доступны в свойстве dataset (например, data-about='')
elem.dataset.about - доступно чтение и запись



		// Методы для создания узлов:

document.createElement(tag) – создаёт элемент с заданным тегом
document.createTextNode(value) – создаёт текстовый узел
elem.cloneNode(deep) – клонирует элемент, если deep==true, то со всеми дочерними элементами

		// Вставка и удаление:
		
// если добавить существующий элемент, то он вырежется
node.append(...nodes or strings) – добавляет узлы или строки <текст> в конец node
node.prepend(...nodes or strings) – вставляет узлы или строки в начало node
node.before(...nodes or strings) – вставляет узлы или строки перед node
node.after(...nodes or strings) – вставляет узлы или строки после node
node.replaceWith(...nodes or strings) - заменяет node заданными узлами или строками
node.remove() – удаляет node

elem.insertAdjacentHTML(where, html) - вставляет фрагмент HTML в зависимости от where
"beforebegin" – вставляет html прямо перед elem
"afterbegin" – вставляет html в elem в начало
"beforeend" – вставляет html в elem в конец
"afterend" – вставляет html сразу после elem
elem.insertAdjacentText(where, text) - вставляет текстовые строки
elem.insertAdjacentElement(where, element) - вставляет элементы

		// Устаревшие методы (все эти методы возвращают вставленный/удалённый узел):

parentElem.appendChild(node) - добавляет node в конец дочерних элементов parentElem
parentElem.insertBefore(node, nextSibling) - вставляет node перед nextSibling в parentElem
parentElem.removeChild(node) - удаляет node из parentElem
parentElem.replaceChild(newElem, oldChild) - заменяет oldChild на node



		// Стили и классы

// Для управления классами существуют два DOM-свойства:
elem.className – строковое значение, удобно для управления всем набором классов
elem.classList – объект с методами add/remove/toggle/contains, 
								 для управления отдельными классами; classList является перебираемым

// elem.style – это объект, который соответствует только тому, что есть в атрибуте "style"; 
// используя elem.style, мы не можем прочитать ничего, что приходит из классов CSS ( для 
// этого есть getComputedStyle() ); возвращает строку; все св-ва с дефисом через camelCase: 
elem.style.width = "5px"
document.body.style.display = "" - для удаления стиля присваивается пустая строка

// Свойство style.cssText соответствует всему атрибуту "style", полной строке стилей;
// Для задания нескольких стилей в одной строке используется свойство style.cssText:
div.style.cssText = `color: red !important;
								     width: 100px;`

// Для чтения окончательных стилей из css и атрибута style (после применения  
// всех CSS-правил и CSS-наследования) используется метод (возвращает строку('5px')):
let computedObj = getComputedStyle(elem, [pseudo]).marginTop - только для чтения

// Записывать св-ва можно только в атрибут "style", в css нельзя! из css только чтение




		// Размеры и прокрутка элементов (все св-ва только для чтения, кроме scrollLeft/scrollTop)

// Возвращают number
offsetParent – ближайший CSS-позиционированный родитель или ближайший td, th, table, body
offsetLeft/offsetTop – позиция в пикселях верхнего левого угла относительно offsetParent
offsetWidth/offsetHeight – «внешняя» ширина/высота элемента; <clientWidth + border>
clientLeft/clientTop – расстояние от верхнего левого внешнего угла до 
											 внутренного; <offsetWidth - clientWidth>
clientWidth/clientHeight – ширина/высота видимого содержимого вместе с внутренними отступами  
													 padding, но без scrollbar; <content + padding - scrollBar>
scrollLeft/scrollTop – ширина/высота прокрученной части элемента от верхнего левого угла
scrollWidth/scrollHeight – ширины/высота содержимого, аналогично clientWidth/Height, 
													 но учитывают прокрученную, невидимую область элемента



	 	// Размеры и прокрутка окна

window.innerWidth/Height - ширина/высота окна с учетом scrollBar, в отличае от clientWidth

// Чтобы надёжно получить полную высоту документа, учитывая несоответствия/ошибки браузеров
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

// Получить текущую прокрутку страницы можно не только от documentElement.scrollLeft/Top, 
// тем более в старых браузерах есть несовместимость; есть такие св-ва window
window.pageXOffset/pageYOffset - только для чтения


window.scrollBy(x,y) - прокручивает страницу относительно её текущего положения
window.scrollTo(pageX,pageY) - прокручивает страницу на абсолютные координаты

// top=true (по умолчанию), то страница будет прокручена, чтобы elem появился в верхней 
// части окна; если false - нижний край элемента будет совмещён с нижним краем окна
elem.scrollIntoView(top) - прокручивает страницу



		// Координаты

// Любая точка на странице имеет координаты:

//  - Относительно окна браузера: 
elem.getBoundingClientRect() - возвращает объект со св-ми: x/y, width/height, top/bottom, 
															 left/right {включая border}
//  - Относительно документа, например: 
elem.getBoundingClientRect().top + window.pageYOffset





		// События

// Есть три способа назначения обработчиков событий (event - объект события):

// on<событие>; значение оборачивается в function(event) {}, поэтому в атрибуте вызов ф-ии!
// внутри обработчика события this ссылается на текущий элемент
- Атрибут: 				onclick="functionDo(this.innerHTML)"

// on<событие>; убрать обработчик можно назначением elem.onclick = null;
// так как у элемента DOM может быть только одно свойство с именем onclick, то  
// назначить более одного обработчика нельзя
- DOM-свойство: 	elem.onclick = function(event){ alert('Клик!') }

// позволяют повесить несколько обработчиков на одно событие;
// для удаления нужно передать именно ту функцию-обработчик которая была назначена
- методы: 				elem.addEventListener(event, handler[, options]) - для добавления, 
									elem.removeEventListener(event, handler[, options]) - для удаления 


// когда происходит событие, браузер создаёт объект события, записывает в него  
// детали и передаёт его в качестве аргумента функции-обработчику
elem.addEventListener('click', function(event) {
		// вывести тип события, элемент и координаты клика
    alert(`${event.type} на ${event.currentTarget}`);
    alert(`Координаты: ${event.clientX} : ${event.clientY}`);
})

// можно назначить обработчиком не только функцию, но и объект-обработчик в
// addEventListener; когда происходит событие, вызывается метод объекта handleEvent
elem.addEventListener('click', { // объект-обработчик с методом handleEvent(event)
	handleEvent(event) {
		alert(`${event.type} на ${event.currentTarget}`);
	}
})



		// Всплытие и погружение

// Принцип всплытия - когда на элементе происходит событие, обработчики сначала срабатывают   
// на нём, потом на его родителе, затем выше и так далее, вверх по цепочке предков;
// почти все события всплывают
event.target - // самый глубокий элемент, вызывающий событие, называется целевым элементом
event.currentTarget (он же this) -  // элемент, до которого дошло всплытие, на нём сейчас 
																		// выполняется обработчик
event.stopPropagation() - // предотвращает всплытие
event.stopImmediatePropagation() - // не только предотвращает всплытие, но и останавливает 
																	 // обработку событий на текущем элементе

// Делегирование событий - прием, когда на общий для нескольких элементов предок-элемент 
// вешается обработчик, и в зависимости от цели (event.target) обрабатывются дочерние 
// элементы. Это позволяет создавать один обработчик для нескольких элементов 