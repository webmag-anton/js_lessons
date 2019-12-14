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


Array.from(document.body.children)
			.find(item => item.getAttribute("data-color") == "red")
			.style.backgroundColor = 'lightblue';




/* 1.4 */

// let table = document.getElementById('age-table');
// table.getElementsByTagName('label');
// table.querySelector('td');
// let formS = table.querySelector('form[name="seach"]');
// let inputs = form.querySelectorAll('input');
// inputs[inputs.length-1];