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

let listPrompt = document.createElement('ul');
document.body.append(listPrompt);

while(true){
	let question = prompt('введите содержимое пункта', 'text');
	if (!question) break;

	let listItem = document.createElement('li');
	listItem.textContent = question;
	listPrompt.append(listItem);
}

