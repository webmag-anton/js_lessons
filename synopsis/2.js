

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
parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.
// 	- Только для узлов-элементов (тегов): 
parentElement, children, firstElementChild, lastElementChild, 
previousElementSibling, nextElementSibling.



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
elem.textContent - читает ткст без учета тегов; записывает «как текст», даже если есть теги
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

// Для управления стилями существует объект elem.style, все св-ва с дефисом через camelCase: 
elem.style.width = "5px"
document.body.style.display = "" - для удаления стиля присваивается пустая строка

// Для задания нескольких стилей в одной строке используется 
// специальное свойство style.cssText:
div.style.cssText = `color: red !important;
								     width: 100px;`

// Для чтения окончательных стилей (после применения всех CSS-правил и 
// CSS-наследования) используется метод:
let computedObj = getComputedStyle(elem, [pseudo]) - только для чтения



		// Размеры и прокрутка элементов

offsetParent – ближайший CSS-позиционированный родитель или ближайший td, th, table, body
offsetLeft/offsetTop – позиция в пикселях верхнего левого угла относительно offsetParent
offsetWidth/offsetHeight – «внешняя» ширина/высота элемента; <clientWidth + padding + boder>
clientLeft/clientTop – расстояние от верхнего левого внешнего угла до 
											 внутренного; <offsetWidth - clientWidth>
clientWidth/clientHeight – ширина/высота содержимого вместе с внутренними отступами padding, 
													 но без scrollbar; <content + padding - scrollbar>
scrollLeft/scrollTop – ширина/высота прокрученной части элемента от верхнего левого угла
scrollWidth/scrollHeight – ширины/высота содержимого, аналогично clientWidth/Height, 
													 но учитывают прокрученную, невидимую область элемента
