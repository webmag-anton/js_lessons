const canvas = document.getElementById('sea_battle')
const ctx = canvas.getContext('2d')

const CELL_SIZE = 23 // размер клетки тетради
const FIELD_SIZE = 30 // размер клетки поля боя

canvas.width = 1000
canvas.height = 500


// function drawRect (param) {   // рисование прямоугольников
// 	if (!param.fill && !param.stroke) {
// 		return // если нет ни контура ни заполнения, то выходим
// 	}

// 	ctx.beginPath()  // создать новую геометрическую единицу
// 	ctx.rect(param.x, param.y, param.width, param.height)

// 	if (param.fill) {   // если есть и заливка и контур, то сначала идет заливка
// 		ctx.fillStyle = param.fillStyle
// 		ctx.fill()
// 	}

// 	if (param.stroke) { 	// ... а потом обводка
// 		ctx.strokeStyle = param.strokeStyle
// 		ctx.lineWidth = param.lineWidth
// 		ctx.stroke()
// 	}
// }

// drawRect({
// 	x: 10,
// 	y: 10,
// 	width: 100,
// 	height: 100,
	
// 	lineWidth: 5,  						// ширина контура

// 	strokeStyle: 'red',				// цвет контура
// 	stroke: true,							// контур
	
// 	fillStyle: 'green',				// цвет заполнения
// 	fill: true, 							// заполнение
// })


function clearCanvas() {
	canvas.width |= 0  // очищаем канвас таким образом
}

function drawGrid() { 	// разлиновка тетради в клетку
	ctx.strokeStyle = 'blue'
	ctx.lineWidth = 0.5

	// вертикальные линии
	for (let i = 0; i < canvas.width / CELL_SIZE; i++) {
		ctx.beginPath()
		ctx.moveTo(i * CELL_SIZE, 0) // ставим перо
		ctx.lineTo(i * CELL_SIZE, canvas.height) // прочерчиваем до конца поля
		ctx.stroke() // рисуем
	}

	// горизонтальные линии
	for (let i = 0; i < canvas.height / CELL_SIZE; i++) {
		ctx.beginPath()
		ctx.moveTo(0, i * CELL_SIZE)
		ctx.lineTo(canvas.width, i * CELL_SIZE)
		ctx.stroke()
	}

	ctx.strokeStyle = 'red'
	ctx.lineWidth = 2
	ctx.beginPath() // красная линия поля
	ctx.moveTo(0, 75)
	ctx.lineTo(canvas.width, 75)
	ctx.stroke()
}



const mouse = getMouse(canvas)  // координаты движения мыши, получаемые из mouse.js

// setInterval( function() {
// 	// в метод isMouseUnder класса Topology передаются координаты движения мыши, получаемые из mouse.js
// 	// console.log( player.isMouseUnder(mouse) )  //  если шышь движется над полем боя, возвращает true
// 	console.log( player.getCoordinates(mouse) )  //  возвращает координаты движения над полем
// }, 300)



const game = new Game()

