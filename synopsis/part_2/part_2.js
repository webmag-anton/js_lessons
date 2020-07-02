

                  /*** Браузер: документ, события, интерфейсы ***/


               
//    Окружение предоставляет свои объекты и дополнительные функции, в дополнение базовым языковым. 
// Браузеры, например, дают средства для управления веб-страницами. Node.js делает доступными какие-то 
// серверные возможности. На схеме в общих чертах показано, что доступно для JS в браузерном окружении:
//                                    window
//                  /                   |                 \
//                DOM                  BOM                JavaScript
//              document             navigator            Object
//              ...                  screen               Array
//                                   location             Function
//                                   frames               ...
//                                   history
//                                 XMLHttpRequest



      /*--- Документ ---*/								


//    DOM – объектная модель документа, которая представляет все содержимое страницы в виде объектов, 
// которые можно менять. Все, что есть в HTML, даже комментарии, является частью DOM.      

//    DOM-узлы – это обычные объекты JavaScript. Мы можем их изменять, добавлять св-ва, методы.
// Каждый DOM-узел принадлежит определённому классу. Классы формируют иерархию. Весь набор 
// свойств (href, value...) и методов (querySelector, append...) является результатом наследования.

//    Когда браузер загружает страницу, он «читает» (парсит) HTML и генерирует из него DOM-объекты.
// Для узлов-элементов большинство стандартных HTML-атрибутов автоматически становятся свойствами 
// DOM-объектов. Например, для <body id='page'> у DOM-объекта будет такое свойство body.id="page".

//    Для нестандартных атрибутов (например, <body type=''>) не будет соответствующих DOM-свойств. 
// То есть, alert(body.type) - undefined. 
// Но такие атрибуты доступны с помощью методов для атрибутов ( elem.getAttribute(name)... )

//    Получив DOM-node мы получаем объект со встроенными DOM-свойства (href, value...) и 
// DOM-методами (querySelector, append...) + со стандартными св-ми и методами объектов JS.

// Можно выделить какой то элемент в devTools и в консоле набрать console.dir($0). Мы увидем какое
// огромное количество свойств у DOM-node объекта. Поэтому самая затратная работа в JS - работа с DOM.

// DOM-узлы можно изменять, добавлять св-ва, методы. Например, создадим новое св-во у document.body:
// document.body.myData = {
//    name: 'Caesar',
//    title: 'Imperator'
// }
// DOM-свойства и методы ведут себя так же, как и обычные объекты JavaScript:
// - им можно присвоить любое значение
// - они регистрозависимы (нужно писать elem.nodeType, не elem.NoDeTyPe)

// Получая набор из нескольких DOM-узлов с помощью, например, метода childNodes, мы получаем 
// коллекцию NodeList, которая похожа на массив, но не является полноценным массивом. 
// Коллекция – особый перебираемый псевдомассив ( можно перебрать в for..of, есть forEach() ).
// Можно использовать Array.from() для создания массива из коллекции; или spread: [...nodes]



      // Навигация по DOM-элементам
         
<html/> - document.documentElement
<head/> - document.head
<body/> - document.body



// Получив DOM-узел, мы можем перейти к его ближайшим соседям используя  
// навигационные ссылки. Есть два основных набора ссылок:

// 	- Для всех узлов (теги, текст, комментарии...): 
parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling
// 	- Только для узлов-элементов (тегов): 
parentElement, children, firstElementChild, lastElementChild, 
previousElementSibling, nextElementSibling

// Коллекция childNodes содержит список всех детей, включая текстовые узлы. 


// Элемент <table> поддерживает следующие свойства:
table.rows – коллекция строк <tr> таблицы
table.caption/tHead/tFoot – ссылки на элементы таблицы <caption/>, <thead/>, <tfoot/>
table.tBodies – коллекция элементов таблицы <tbody/> (по спецификации их может быть больше одного)
thead/tbody/tfoot.rows – коллекция строк <tr> секции
tr.cells – коллекция <td> и <th> ячеек, находящихся внутри строки <tr>
tr.sectionRowIndex – номер строки <tr> в текущей секции <thead>/<tbody>/<tfoot>
tr.rowIndex – номер строки <tr> в таблице (включая все строки таблицы)
td.cellIndex – номер ячейки в строке <tr>




      // Основные методы поиска элементов в DOM (elem.method - ищет внутри elem):

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

// Атрибуты – это то, что написано в HTML; 
// Свойства – это то, что находится в DOM-объектах. 
// Значением атрибута может быть только строка, а свойства - любой тип, как у обычного объекта.
// У св-ва имя регистрозависимо, а у атрибута - нет.
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
node.replaceWith(...nodes or strings) - заменяет node заданными узлами или строками, не удаляя
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
offsetWidth/offsetHeight – «внешняя» ширина/высота элемента; <clientWidth + scrollBar + border>
clientLeft/clientTop – расстояние от верхнего левого внешнего угла до 
                       внутренного; <offsetWidth - clientWidth = scrollBar + border>
clientWidth/clientHeight – ширина/высота видимого содержимого вместе с внутренними отступами  
                           padding, но без scrollbar; <content + padding - scrollBar>
scrollLeft/scrollTop – ширина/высота прокрученной части элемента от верхнего левого угла
scrollWidth/scrollHeight – ширины/высота содержимого, аналогично clientWidth/Height, 
                           но учитывают прокрученную, невидимую область элемента



       // Размеры и прокрутка окна 

// window.clientWidth не бывает, clientWidth для элементов
window.innerWidth/Height - ширина/высота окна с учетом scrollBar, в отличае от clientWidth

// Чтобы надёжно получить полную высоту документа, учитывая несоответствия/ошибки браузеров
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
)

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

//  - Относительно окна браузера (даже если элемент находится вне окна (вне видимости)): 
elem.getBoundingClientRect() - возвращает объект со св-ми: x/y, width/height, top/bottom, 
                               left/right {включая border}
//  - Относительно документа, например: 
elem.getBoundingClientRect().top + window.pageYOffset





      /*--- События ---*/	


// Есть три способа назначения обработчиков событий (event - объект события):

// on<событие>; значение оборачивается в function(event) {}, поэтому в атрибуте вызов ф-ии!
// внутри обработчика события this ссылается на текущий элемент
- Атрибут: 				onclick="functionDo(this.innerHTML)"

// on<событие>; убрать обработчик можно назначением elem.onclick = null;
// так как у элемента DOM может быть только одно свойство с именем onclick, то  
// назначить более одного обработчика нельзя
- DOM_свойство:   	elem.onclick = function(event){ alert('Клик!') }

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



      // Действия браузера по умолчанию

// Сначала выполняется обработчик события, а затем действия по умолчанию, если не отменены
event.preventDefault() - отменить действие браузера по умолчанию; для обработчиков  
                         назначенных через on<событие> можно так же return false

// бывают события, вытекающие из других, например, событие mousedown для поля <input>  
// приводит к фокусировке на нём и запускает событие focus. Если мы отменим событие 
// mousedown, то фокусирования не произойдёт

// останавливать «всплытие» – плохо, т.к. например клик при всплытии может быть ипользован 
// для статистичесих счетчиков, а stopPropagation() закроет доступ к этому обработчику; 
// лучше вместо этого использовать св-во event.defaultPrevented, чтобы просигналить другим 
// обработчикам, что событие обработано; 
// в верхнем обработчике: if (event.defaultPrevented) return; - для отмены обработки события
event.defaultPrevented - свойство установлено в true, если действие по умолчанию  
                         было	предотвращено, и false, если нет

// Действий браузера по умолчанию достаточно много (вот некоторые):
mousedown – 	начинает выделять текст {если двигать мышкой}
submit –			при нажатии на <input type="submit"> или при нажатии клавиши Enter в 
               форме данные отправляются на сервер
keydown – 		при нажатии клавиши в поле ввода появляется символ
contextmenu –  при правом клике показывается контекстное меню браузера



      // Генерация пользовательских событий

// Событие встроенного класса Event можно создать так:
let event = new Event(type[, options]) - создание события
// type – тип события, строка, например "click" или же любой придуманный нами – "my-event"
// options – объект с двумя необязательными свойствами (по умолчанию оба свойства false):   
// - bubbles: true/false - если true, тогда событие всплывает 
// - cancelable: true/false – если true, тогда можно использовать preventDefault() 

// Для некоторых конкретных типов событий есть свои специфические конструкторы, например:
// UIEvent, FocusEvent, MouseEvent, WheelEvent, KeyboardEvent... Стоит использовать их 
// вместо new Event. Специфический конструктор позволяет  указать стандартные свойства для 
// данного типа события (clientX/clientY для события мыши)
let event = new MouseEvent( "click", {bubbles: true, clientX: 100, clientY: 100} )

// Для генерации событий совершенно новых типов, таких как, например, "hello", следует 
// использовать конструктор new CustomEvent. Технически CustomEvent абсолютно идентичен Event
// за исключением небольшой детали:  у второго аргумента-объекта есть дополнительное свойство 
// detail, в котором можно указывать информацию для передачи в событие, например:
let customEvent = new CustomEvent( "hello", {detail: {name: "Вася"}} )

// После того, как объект события создан, мы должны запустить его на элементе, вызвав метод 
elem.dispatchEvent(event) - вызов события

// нужно использовать addEventListener для наших собственных событий; 
// on<event>-свойства существуют только для встроенных событий: document.onhello не сработает

// можно отличить настоящее событие от сгенерированного кодом с помощью св-ва объекта события
event.isTrusted - true для реальных действий пользователя; false для генерируемых кодом

// Вложенные события обрабатываются синхронно
// Обычно события обрабатываются асинхронно. То есть, если браузер обрабатывает onclick и в 
// процессе этого произойдёт новое событие, то оно ждёт, пока закончится обработка onclick.
// Исключением является ситуация, когда событие инициировано из обработчика другого события





      /*--- Интерфейсные события ---*/	


      // Основы событий мыши

// простые события:
mousedown/mouseup  - кнопка мыши нажата/отпущена над элементом
mouseover/mouseout - курсор мыши появляется над элементом и уходит с него; имеют 
                     дополнительное св-во relatedTarget; оно содержит ссылку на 
                     элемент с/на который мы переходим
mouseenter/mouseleave - вызывается, когда курсор переходит на элемент или уходит с него; но
                        переходы внутри элемента на его потомки и с них не считаются; так же 
                        есть св-во relatedTarget; эти события не всплывают, поэтому нельзя 
                        использовать делегирование!
mousemove   - каждое движение мыши над элементом генерирует это событие
contextmenu - вызывается при попытке открытия контекстного меню правой кнопки мыши
// комплексные события:
click - вызывается при mousedown , а затем mouseup над одним и тем же элементом, 
        если использовалась левая кнопка мыши
dblclick - вызывается двойным кликом на элементе

// cобытия мыши имеют следующие свойства:
- кнопка: button {0 - левая, 1 - колесо, 2 - правая}
- клавиши-модификаторы {true если нажаты}: altKey, ctrlKey, shiftKey и metaKey {Mac}
- координаты относительно окна: clientX/clientY
- координаты относительно документа: pageX/pageY
- скролл колеса мыши: wheel

// В современном стандарте HTML5 есть раздел о Drag and Drop – и там есть специальные 
// события именно для Drag’n’Drop переноса, такие как dragstart, dragend и так далее;

// браузер имеет свой собственный Drag’n’Drop (события dragstart, dragend...), который 
// автоматически запускается и вступает в конфликт с нашим; это происходит именно для  
// картинок и некоторых других элементов; чтобы его отключить: 
elem.ondragstart = function() { return false }



      // Клавиатура: keydown и keyup

// события клавиатуры:
keydown – при нажатии на клавишу {если клавиша остаётся нажатой, происходит автоповтор}
keyup – при отпускании клавиши

// главные свойства для работы с клавиатурными событиями:
code – код {"KeyA", "ArrowLeft"}, привязанный к физическому расположению клавиши на клавиатуре 
key – символ {"A", "a" ...}; при изменении языка раскладки меняется и символ
repeat - для событий вызванных автоповтором свойство repeat равно true


      // Прокрутка

scroll - событие позволяет реагировать на прокрутку страницы или элемента





      /*--- Формы, элементы управления ---*/	


      // Свойства и методы формы

document.forms - «именованная» кол-я форм {document.forms.my {name='my'} или document.forms[0]}

// получаем элемент формы <input name="one"> с помощью св-ва elements
// если несколько элементов с одним и тем же именем (radio), то form.elements[name] - коллекция
let form = document.forms.my;   let elem = form.elements.one;
// cокращённая форма записи
form.elements.login == form.login
// для любого элемента форма доступна через element.form (элементы хранят ссылку на свою форму)

input.value = "Новое значение";
textarea.value = "Новый текст";
input.checked = <boolean.>; // для чекбоксов и переключателей

// элемент <select> имеет 3 важных свойства:
select.options – коллекция из подэлементов <option>
select.value – значение выбранного в данный момент <option>
select.selectedIndex – номер выбранного <option>
// свойства элемента <option>:
option.selected - <boolean>
option.index - номер опции среди других в списке 
option.text - содержимое опции

// создания элемента <option>: 
new Option(text, value, defaultSelected, selected)
// defaultSelected – если true, то ставится HTML-атрибут selected
// selected – если true, то элемент <option> будет выбранным



      // Фокусировка

// элемент получает фокус (если он фокусируемый или если у него установлен tabIndex),
// когда пользователь кликает по нему или использует клавишу Tab;
// существует HTML-атрибут autofocus - устанавливает фокус, когда страница загружается;
// событие focus/blur не всплывают, но можно использовать или фазу погружения (перехвата), 
// установив 3й параметр метода addEventListener в true, или всплывающие focusin/focusout
focus - вызывается в момент фокусировки, не всплывает
blur - вызывается когда элемент теряет фокус, не всплывает
focusin - вызывается в момент фокусировки, всплывает
focusout - вызывается когда элемент теряет фокус, всплывает 
// нельзя отменить потерю фокуса, вызвав event.preventDefault() в обработчике 
// события blur потому, что onblur срабатывает после потери фокуса элементом

elem.focus() - устанавливеют фокус элементу
elem.blur() - снимает фокус c элемента

// многие элементы по умолчанию не поддерживают фокусировку; метод elem.focus() не работает 
// для них, и события focus/blur никогда не срабатывают; однако любой элемент поддерживает 
// фокусировку, если имеет HTML-атрибут tabindex. Порядок перебора таков: сначала идут 
// элементы со значениями tabindex от 1 и выше, в порядке tabindex, а затем элементы без 
// tabindex (например, обычный <input>)
elem.tabIndex - добавление tabindex из JavaScript
tabindex="-1" - позволяет фокусироваться на элементе только программно {методом elem.focus()} 
tabindex="0"  - ставит элемент в один ряд с элементами без tabindex; то есть, при 
                переключении такие элементы будут после элементов с tabindex ≥ 1

document.activeElement - получить текущий элемент с фокусом

// alert переводит фокус на себя – элемент теряет фокус (событие blur), а когда alert 
// закрывается – элемент получает фокус обратно (событие focus)



      // События: change, input, cut, copy, paste

change - срабатывает по окончании изменения элемента; для текстовых <input> это означает, 
         что событие происходит при потере фокуса; при печатанье событие не происходит;
         для select/checkbox/radio событие запускается сразу после изменения значения
input  - срабатывает каждый раз при изменении значения; если значение не меняется, например
         при нажатии стрелочки влево, то событие не срабатывает; событие input происходит 
         после изменения значения, поэтому event.preventDefault() не работает
cut, copy, paste - события происходят при вырезании/копировании/вставке данных; свойство 
                   event.clipboardData предоставляет доступ на чтение/запись в буфер обмена



      // Отправка формы: событие и метод submit

// Есть два основных способа отправить форму (оба действия сгенерируют событие submit на форме):
// – нажать кнопку <input type="submit"> или <input type="image">
// – нажать Enter, находясь на каком-нибудь поле
submit - срабатывает при отправке формы; оно обычно используется для валидации формы перед 
         её отправкой на сервер или для предотвращения отправки и обработки её с помощью JS
// при отправке формы генерируется событие click на кнопке <input type="submit">

form.submit() - инициирует отправку формы из JavaScript





      /*--- Загрузка документа и ресурсов ---*/	


      // Страница: события DOMContentLoaded, load, beforeunload, unload

DOMContentLoaded {document} – браузер полностью загрузил HTML, было построено DOM-дерево, загружены все 
                              скрипты {кроме скриптов с async и динамически сгенерированных скриптов}, 
                              но внешние ресурсы, такие как картинки и стили, могут быть ещё не загружены
// когда браузер обрабатывает HTML-документ и встречает тег <script>, он должен выполнить его 
// перед тем, как продолжить строить DOM; это делается на случай, если скрипт захочет изменить 
// DOM; поэтому DOMContentLoaded определённо случится после таких скриптов
// Есть два исключения из этого правила:
// - скрипты с атрибутом async не блокируют DOMContentLoaded
// - скрипты, сгенерированные динамически при помощи document.createElement('script') 
//   и затем добавленные на страницу, также не блокируют это событие

// скрипты дожидаются загрузки стилей, стоящих перед ними, а DOMContentLoaded ждет скрипты!
// DOMContentLoaded не ждет загрузки внешних стилей; но если после стилей у нас есть обычный
// скрипт (не внутри события DOMContentLoaded), то этот скрипт должен дождаться загрузки
// стилей, т.к. скрипту может понадобиться получить свойства элементов, зависящие от стилей


load – браузер загрузил HTML и внешние ресурсы {картинки, стили и тд}

// Событие beforeunload генерируется, когда пользователь покидает страницу; если мы отменим событие, 
// браузер спросит, на самом ли деле пользователь хочет уйти (например, у нас есть несохранённые изменения)
beforeunload – пользователь покидает страницу; можно отменить переход на другую страницу в confirm

// Событие unload на window генерируется, когда пользователь окончательно уходит, в обработчике мы можем 
// делать только простые вещи, которые ни о чём не спрашивают пользователя и не заставляют его ждать; из-за 
// этих ограничений оно редко используется; мы можем послать сетевой запрос с помощью navigator.sendBeacon
unload – пользователь покидает страницу {обычно здесь отсылают статистику}; отменить переход на другую 
         страницу нельзя

document.readyState – текущее состояние документа, изменения можно отследить событием readystatechange:
loading – документ грузится
interactive – документ прочитан, происходит примерно в то же время, что и DOMContentLoaded, но до него
complete – документ и ресурсы загружены, происходит примерно в то же время, что и window.onload, но до него



      // Скрипты: async, defer

скрипты с defer никогда не блокируют страницу
скрипты с defer всегда выполняются, когда дерево DOM готово, но до события DOMContentLoaded
отложенные с помощью defer скрипты сохраняют порядок относительно друг друга, как и обычные скрипты
атрибут defer предназначен только для внешних скриптов

// атрибут async означает, что скрипт абсолютно независим:
страница не ждёт асинхронных скриптов, содержимое обрабатывается и отображается
событие DOMContentLoaded и асинхронные скрипты не ждут друг друга
асинхронные скрипты не ждут друг друга
остальные скрипты не ждут async, и скрипты c async не ждут другие скрипты
// асинхронные скрипты очень полезны для добавления на страницу сторонних скриптов: счётчиков, 
// рекламы и т.д. Они не зависят от наших скриптов, и мы тоже не должны ждать их

// Мы можем также добавить скрипт и динамически, с помощью JavaScript:
// let script = document.createElement('script')
// script.src = "/article/script-async-defer/long.js"
// document.body.append(script)
// Динамически загружаемые скрипты по умолчанию ведут себя как «async»
// Мы можем изменить относительный порядок скриптов с «первый загрузился – первый выполнился» на 
// порядок, в котором они идут в документе (как в обычных скриптах) с помощью явной установки 
// свойства async в false



      // Загрузка ресурсов: onload и onerror

// Изображения <img>, внешние стили, скрипты и другие ресурсы 
// предоставляют события load и error для отслеживания загрузки:
// - load срабатывает при успешной загрузке
// - error срабатывает при ошибке загрузки
// Единственное исключение – это <iframe>: по историческим причинам срабатывает всегда load вне 
// зависимости от того, как завершилась загрузка, даже если страница не была найдена





      /*--- Разное ---*/	


      // MutationObserver: наблюдатель за изменениями

MutationObserver – это встроенный объект, наблюдающий за DOM-элементом и запускающий 
                   колбэк в случае изменений

// Сначала мы создаём наблюдатель за изменениями с помощью колбэк-функции:
let observer = new MutationObserver(callback)
// Потом прикрепляем его к DOM-узлу:
observer.observe(node, config)
// config – это объект с булевыми параметрами «на какие изменения реагировать»
// После изменений, выполняется callback, в который изменения передаются первым аргументом как
// массив объектов MutationRecord, а сам наблюдатель (экземпляр MutationObserver) идёт вторым аргументом




      // Событийный цикл: микрозадачи и макрозадачи

/* 

Очередь, которую формируют такие задачи как: загрузка внешнего скрипта, обработка 
событий, setTimeout, setInterval называют «очередью макрозадач» (macrotask queue, термин v8)

Очередь, которую формируют обработчики промисов, async/await называют «очередью микрозадач».
Микрозадачи исполняются непрерывно одна за другой

Более подробный алгоритм событийного цикла:
1) Выбрать и исполнить старейшую задачу из очереди макрозадач (например, «script»).
2) Исполнить все микрозадачи:
3) Пока очередь микрозадач не пуста: - Выбрать из очереди и исполнить старейшую микрозадачу
4) Отрисовать изменения страницы, если они есть.
5) Если очередь макрозадач пуста – подождать, пока появится макрозадача.
6) Перейти к шагу 1.

Чтобы добавить в очередь новую макрозадачу используйте setTimeout(f) с нулевой задержкой
Для добавления в очередь новой микрозадачи используйте queueMicrotask(f)


Если понажимать другие кнопки - никакие другие события не обрабатываются до завершения функции счёта:
let i = 0;
function count() {
  // делаем тяжёлую работу
  for (let j = 0; j < 1e9; j++) {
    i++;
  }
  alert("Done");
}
count();

Если разбить эту задачу на части, воспользовавшись вложенным setTimeout, то теперь интерфейс браузера 
полностью работоспособен во время выполнения «счёта»:

let i = 0;
function count() {
  // делаем часть тяжёлой работы (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done");
  } else {
    setTimeout(count); // планируем новый вызов (**)
  }
}
count();

Один вызов count делает часть работы (*), а затем, если необходимо, планирует свой очередной запуск (**):
Первое выполнение производит счёт: i=1…1000000.
Второе выполнение производит счёт: i=1000001…2000000.
…и так далее.
Теперь если новая сторонняя задача (например, событие onclick) появляется, пока движок занят выполнением 
1-й части, то она становится в очередь, и затем выполняется, когда 1-я часть завершена, перед следующей 
частью. Периодические возвраты в событийный цикл между запусками count дают движку достаточно «воздуха», 
чтобы сделать что-то ещё, отреагировать на действия пользователя.



Рендеринг (отрисовка страницы) никогда не происходит во время выполнения задачи движком. Не имеет значения, 
сколь долго выполняется задача. Изменения в DOM отрисовываются только после того, как задача выполнена.

В примере ниже изменения i не будут заметны, пока функция не завершится, поэтому мы 
увидим только последнее значение i
<div id="progress"></div>
function count() {
  for (let i = 0; i < 1e6; i++) {
    i++;
    progress.innerHTML = i;
  }
}
count();

Если мы разобьём тяжёлую задачу на части, используя setTimeout, то изменения индикатора будут 
отрисованы в промежутках между частями:

let i = 0;
function count() {
  // сделать часть крупной задачи (*)
  do {
    i++;
    progress.innerHTML = i;
  } while (i % 1e3 != 0);

  if (i < 1e7) {
    setTimeout(count);
  }
}
count(); 

*/