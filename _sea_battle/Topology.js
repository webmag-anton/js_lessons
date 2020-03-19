
/*		класс Topology отвечает за отрисовку поля боя, кораблей, попаданий...		*/

class Topology {
	constructor(param) {
		this.offsetX = param.offsetX  // отступы от угла тетради
		this.offsetY = param.offsetY

		this.secretField = param.secretField || false

		this.sheeps = []	// массив кораблей
		this.checks = [] 	// массив произведенных выстрелов (чекнутых точек)
		this.injuries = [] 	// массив ранений
		this.kills = [] 	// массив потопленных кораблей
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
			this.offsetX + FIELD_SIZE + sheep.x * FIELD_SIZE + 1,
			this.offsetY + FIELD_SIZE + sheep.y * FIELD_SIZE + 1,
			(sheep.direct === 0 ? sheep.size : 1) * FIELD_SIZE - 2,
			(sheep.direct === 1 ? sheep.size : 1) * FIELD_SIZE - 2,
		)
		context.fill()
		return this
	}

	drawChecks (context, check) {
		context.fillStyle = 'black'
		context.beginPath()
		context.arc(
			this.offsetX + check.x * FIELD_SIZE + FIELD_SIZE * 1.5,
			this.offsetY + check.y * FIELD_SIZE + FIELD_SIZE * 1.5,
			2.5,
			0,
			Math.PI * 2
		)
		context.fill()
		return this
	}

	drawInjury (context, injury) {
		context.strokeStyle = 'red'
		context.lineWidth = 1.5

		context.beginPath()
		context.moveTo(
			this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE,
			this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE
		)
		context.lineTo(
			this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE * 2,
			this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE * 2
		)
		context.stroke()

		context.beginPath()
		context.moveTo(
			this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE * 2,
			this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE
		)
		context.lineTo(
			this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE,
			this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE * 2
		)
		context.stroke()

		return this
	}

	drawKill (context, kill) {
		this.drawSheeps(context, kill)
		
		context.strokeStyle = 'red'
		context.lineWidth = 1.5

		if (kill.direct == 0) {

			for (let i = kill.x; i < kill.x + kill.size; i++) {
				context.beginPath()
				context.moveTo(
					this.offsetX + i * FIELD_SIZE + FIELD_SIZE,
					this.offsetY + kill.y * FIELD_SIZE + FIELD_SIZE
				)
				context.lineTo(
					this.offsetX + i * FIELD_SIZE + FIELD_SIZE * 2,
					this.offsetY + kill.y * FIELD_SIZE + FIELD_SIZE * 2
				)
				context.stroke()

				context.beginPath()
				context.moveTo(
					this.offsetX + i * FIELD_SIZE + FIELD_SIZE * 2,
					this.offsetY + kill.y * FIELD_SIZE + FIELD_SIZE
				)
				context.lineTo(
					this.offsetX + i * FIELD_SIZE + FIELD_SIZE,
					this.offsetY + kill.y * FIELD_SIZE + FIELD_SIZE * 2
				)
				context.stroke()
			}

		}

		else {

			for (let i = kill.y; i < kill.y + kill.size; i++) {
				context.beginPath()
				context.moveTo(
					this.offsetX + kill.x * FIELD_SIZE + FIELD_SIZE,
					this.offsetY + i * FIELD_SIZE + FIELD_SIZE
				)
				context.lineTo(
					this.offsetX + kill.x * FIELD_SIZE + FIELD_SIZE * 2,
					this.offsetY + i * FIELD_SIZE + FIELD_SIZE * 2
				)
				context.stroke()

				context.beginPath()
				context.moveTo(
					this.offsetX + kill.x * FIELD_SIZE + FIELD_SIZE * 2,
					this.offsetY + i * FIELD_SIZE + FIELD_SIZE
				)
				context.lineTo(
					this.offsetX + kill.x * FIELD_SIZE + FIELD_SIZE,
					this.offsetY + i * FIELD_SIZE + FIELD_SIZE * 2
				)
				context.stroke()
			}
		}

		return this
	}
	
	draw(context) {  // рисуем поле боя, затем пробегаемся по всем кораблям и произведенным выстрелам и отрисовываем их
		this.drawFields(context)  // рисуем поле боя 

		if (this.secretField == false) {  // если расположение кораблей не является секретным, то отрисовываем их
			for (const sheep of this.sheeps) {
				this.drawSheeps(context, sheep)
			}
		}
		
		for (const check of this.checks) {
			this.drawChecks(context, check)
		}

		for (const injury of this.injuries) {
			this.drawInjury(context, injury)
		}

		for (const kill of this.kills) {
			this.drawKill(context, kill)
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

		const x = Math.floor((point.x - this.offsetX - FIELD_SIZE) / FIELD_SIZE)
		const y = Math.floor((point.y - this.offsetY - FIELD_SIZE) / FIELD_SIZE)

		return {
			x: Math.max(0, Math.min(9, x)),  // дополнительная проверка из за неточностях при округлении
			y: Math.max(0, Math.min(9, y))
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

	// обновляем массивы выстрелов, попаданий и убийств после выстрела
	update() { 
		// повторяющиеся в то же место выстрелы отфильтровываем
		this.checks = this.checks
			.map(check => JSON.stringify(check))
			.filter((check, ind, arr) => arr.lastIndexOf(check) === ind)   // ['1', '2', '1', '3'].lastIndexOf('1') == 2     ( ['2', '1', '3'] )
			.map(check => JSON.parse(check))

		const map = [
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false]
		]
		// делаем карту своих кораблей для проверки injuries (координате с кораблем 
		// присваиваем true; соседние координаты не в счет - по ним можно стрелять)
		for (const sheep of this.sheeps) {
			if (sheep.direct == 0) {
				for (let x = sheep.x; x < sheep.x + sheep.size; x++) { 
					if (map[sheep.y] && !map[sheep.y][x]) {	
						map[sheep.y][x] = true
					}
				}
			} 
			else { 
				for (let y = sheep.y; y < sheep.y + sheep.size; y++) {
					if (map[y] && !map[y][sheep.x]) { 
						map[y][sheep.x] = true
					}
				}
			}
		}

		Topology.isOrderSaved = false
		// если выстрел является частью корабля, то добавляем выстрел в массив ранений,
		// и удаляем его из массива выстрелов (что б не было точки на месте попадания)
		for (const check of this.checks) {
			if (map[check.y][check.x]) {
				this.injuries.push(check)

				const index = this.checks.indexOf(check)
				this.checks.splice(index, 1)

				Topology.isOrderSaved = true  // если попали, то сохраняем ход
			}
		}


		// проверяем на предмет убийства
		for (const sheep of this.sheeps) {

			if (sheep.size == 1) {  // если однопалубный
				for (const inj of this.injuries) {  // перебмраем все ранения
					// и если есть совпадение с координатами корабля
					if (sheep.x == inj.x && sheep.y == inj.y) {
						this.kills.push(sheep)

						const index = this.injuries.indexOf(inj)
						this.injuries.splice(index, 1)
					}
				}
			}

			else if (sheep.direct == 0) {  // если корабль не однопалубный и горизонтальный

				let count = 0
				// то для каждой его палубы 
				for (let i = sheep.x; i < sheep.x + sheep.size; i++) {
					// проходимся по всем ранениям и ищем совпадения с координатами палубы
					for (const inj of this.injuries) {
						if (inj.x == i && inj.y == sheep.y)  count++   //  если есть совпадение, инкрементируем счетчик
					}
				}

				if (sheep.size == count) {	// если счетчик равен количеству палуб значит корабль убит
					this.kills.push(sheep)
					// для каждой палубы ищем совпадение в injuries и удаляем из injuries соответствующую координату
					for (let i = sheep.x; i < sheep.x + sheep.size; i++) {
						for (const inj of this.injuries) {
							if (inj.x == i && inj.y == sheep.y) {
								const index = this.injuries.indexOf(inj)
								this.injuries.splice(index, 1)
							} 
						}
					}
				}

			} 

			else {	// если корабль не однопалубный и вертикальный

				let count = 0

				for (let i = sheep.y; i < sheep.y + sheep.size; i++) {
					for (const inj of this.injuries) {
						if (inj.x == sheep.x && inj.y == i)  count++
					}
				}

				if (sheep.size == count) {
					this.kills.push(sheep)

					for (let i = sheep.y; i < sheep.y + sheep.size; i++) {
						for (const inj of this.injuries) {
							if (inj.x == sheep.x && inj.y == i) {
								const index = this.injuries.indexOf(inj)
								this.injuries.splice(index, 1)
							} 
						}
					}
				}

			}

		}

	}  // update end

} // class Topology end