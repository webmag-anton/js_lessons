

					/*** Браузер: документ, события, интерфейсы ***/



			// Навигация по DOM-элементам
			

<html> = document.documentElement
<body> = document.body
<head> = document.head

// Коллекция childNodes содержит список всех детей, включая текстовые узлы. 
// childNodes похож на массив. На самом деле это не массив, а коллекция – особый 
// перебираемый объект-псевдомассив (можно перебрать в for..of). Можно 
// использовать Array.from() для создания массива из него.

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
document.getElementbyId(id) - возвращает элемент c id						
elem.getElementsByClassName(class) - возвращает элементы, которые имеют данный CSS-класс	
document.getElementsByName(name) - возвращает элементы с заданным атрибутом name			
elem.getElementsByTagName(tag) - ищет элементы с данным тегом и возвращает их коллекцию				
	
elem.matches(css) - <boolean> - проверяет, удовлетворяет ли elem CSS-селектору
elem.closest(css) - ищет ближайшего предка включая себя, соответствующего CSS-селектору
elemA.contains(elemB) - вернёт true, если elemB находится внутри elemA