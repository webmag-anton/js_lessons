
/*		класс Topology отвечает за отрисовку поля боя		*/

class Topology {
	constructor(param) {
		this.offsetX = param.offsetX  // отступы от угла тетради
		this.offsetY = param.offsetY

		this.sheeps = []	// массив кораблей
		this.checks = [] 	// массив произведенных промахов (чекнутых точек)
	}

	addSheeps(...sheeps) {
		// проверяем не передают ли нам уже добавленный корабль
		for (const sheep of sheeps) {
			if (!this.sheeps.includes(sheep)) { // если в массиве нет передаваемого корабля, то добавляем
				this.sheeps.push(sheep)
			}
		}
		return this // для чейнинга
	}

	addChecks(...checks) {
		for (const check of checks) {
			if (!this.checks.includes(check)) {
				this.checks.push(check)
			}
		}
		return this
	}

	drawFields(context) {  // принимает контекст canvas для манипуляций с ним
		context.strokeStyle = 'blue'
		context.lineWidth = 1.5

		for (let i = 1; i <= 11; i++) { 	// вертикальные полосы
			context.beginPath()
			context.moveTo(
				this.offsetX + i * FIELD_SIZE, 
				this.offsetY
			)
			context.lineTo(
				this.offsetX + i * FIELD_SIZE, 
				this.offsetY + 11 * FIELD_SIZE
			)
			context.stroke()
		}

		for (let i = 1; i <= 11; i++) { 	// горизонтальные полосы
			context.beginPath()
			context.moveTo(
				this.offsetX, 
				this.offsetY + i * FIELD_SIZE
			)
			context.lineTo(
				this.offsetX + 11 * FIELD_SIZE, 
				this.offsetY + i * FIELD_SIZE
			)
			context.stroke()
		}

		context.fillStyle = 'black'
		context.font = '20px Georgia'

		const alphabet = 'АБВГДЕЖЗИК'
		let k = 0
		
		for (let letter of alphabet) { 	// буквы и цифры для координат
	 		context.fillText(
	 			letter, 
	 			this.offsetX + FIELD_SIZE + k++ * FIELD_SIZE + 6, 
	 			this.offsetY + 22
	 		)

	 		context.fillText(
	 			k, 
	 			this.offsetX + 5, 
	 			this.offsetY + FIELD_SIZE + k * FIELD_SIZE - 9
	 		)
		}
		return this
	}


	drawSheeps (context, sheep) {
		context.fillStyle = 'rgba(0,0,0,.75)'
		context.beginPath()
		context.rect(
			this.offsetX + FIELD_SIZE + sheep.x * FIELD_SIZE + 2,
			this.offsetY + FIELD_SIZE + sheep.y * FIELD_SIZE + 2,
			(sheep.direct === 0 ? sheep.size : 1) * FIELD_SIZE - 4,
			(sheep.direct === 1 ? sheep.size : 1) * FIELD_SIZE - 4,
		)
		context.fill()
		return this
	}

	drawChecks (context, check) {
		context.fillStyle = 'black'
		context.beginPath()
		context.arc(
			this.offsetX + FIELD_SIZE + check.x * FIELD_SIZE - FIELD_SIZE / 2,
			this.offsetY + FIELD_SIZE + check.y * FIELD_SIZE - FIELD_SIZE / 2,
			2.5,
			0,
			Math.PI * 2
		)
		context.fill()
		return this
	}
	
	draw(context) {  // рисуем поле боя, затем пробегаемся по всем кораблям и произведенным промахам и отрисовываем их
		this.drawFields(context)  // рисуем поле боя 

		for (const sheep of this.sheeps) {
			this.drawSheeps(context, sheep)
		}

		for (const check of this.checks) {
			this.drawChecks(context, check)
		}
		return this
	}

	isMouseUnder(point) { // получает координаты мыши и, если над полем боя, возвращает true 
		if ( 
			point.x < this.offsetX + FIELD_SIZE || 
			point.x > this.offsetX + 11 * FIELD_SIZE ||
			point.y < this.offsetY + FIELD_SIZE || 
			point.y > this.offsetY + 11 * FIELD_SIZE
		) {
			return false
		}
		return true
	}

	getCoordinates(point) { // если мышь над полем боя, то возвращаются координаты
		// если не над полем боя, то false
		if (!this.isMouseUnder(point)) return false

		return {
			x: Math.floor((point.x - this.offsetX - FIELD_SIZE) / FIELD_SIZE),
			y: Math.floor((point.y - this.offsetY - FIELD_SIZE) / FIELD_SIZE)
		}
	}
	
	// принимает корабль в качестве аргумента, и возвращает true, если он может быть размещен на поле
	canStand(sheep) { 	
		// 1. если вышли за пределы поля, то такой корабль недопустим
		if (sheep.direct == 0 && sheep.x + sheep.size > 10) {  
			return false
		} 
		if (sheep.direct == 1 && sheep.y + sheep.size > 10) {
			return false
		} 

		const map = [
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true]
		]
		
		// 2. присвоение false тем координатам, где корабля не может быть (непосредственное соседство);  
		// при каждой проверке canStand обновляем карту, т.к. после проверки может добавиться новый корабль
		for (const sheep of this.sheeps) {
			if (sheep.direct == 0) { // если горизонтальный корабль
				// проходимся по координатам оси X, включая соседнюю клетку слева/справа (по ним нельзя выстрелить)
				for (let x = sheep.x - 1; x < sheep.x + sheep.size + 1; x++) { 
					// проходимся по координатам оси Y (у текущей координаты X), включая соседнюю клетку сверху/снизу
					for (let y = sheep.y - 1; y < sheep.y + 2; y++) {
						if (map[y] && map[y][x]) {	// если клетка не false
							map[y][x] = false  // то присваеваем клетке false - в нее уже нельзя стрелять 
						}
					}
				}
			} 
			else { // если вертикальный корабль
				for (let x = sheep.x - 1; x < sheep.x + 2; x++) {
					for (let y = sheep.y - 1; y < sheep.y + sheep.size + 1; y++) {
						if (map[y] && map[y][x]) { 
							map[y][x] = false
						}
					}
				}
			}
		}

		// 3. убеждаемся, что на каждой клетке, где корабль хочет располагаться, находится true, иначе возвращаем false
		if (sheep.direct == 0) {
			for (let i = 0; i < sheep.size; i++) {
				if ( !map[sheep.y][sheep.x + i] ) {
					return false
				}
			}
		}
		else {
			for (let i = 0; i < sheep.size; i++) {
				if ( !map[sheep.y + i][sheep.x] ) {
					return false
				}
			}
		}

		return true  // если прошли все проверки, значит корабль может позиционироваться на своих координатах
	}

	randoming() {
		// предварительно очищаем поле
		this.sheeps = []

		// размер кораблей уменьшается на 1, а количество растет на 1
		for (let size = 4; size > 0; size--) {
			for (let n = 0; n < 5 - size; n++) {

				let flag = false

				while (!flag) {
					// генерирум корабль с рандомными координатами
					const sheep = {
						x: Math.floor(Math.random() * 10),
						y: Math.floor(Math.random() * 10),
						direct: Math.random() > Math.random() ? 0 : 1,
						size
					}

					if ( this.canStand(sheep) ) {  // если можем поставить корабль на поле, то ставим
						this.addSheeps(sheep)
						flag = true  // если можем поставить корабль, то заканчиваем цикл; иначе продолжаем искать ему место
					}
				}

			}
		}
	}

}