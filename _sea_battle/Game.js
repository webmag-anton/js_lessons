
/*	
	класс Game отвечает за этапы игры, отслеживание кликов по вражескому полю...
	хранит логику и алгоритм обработки действий пользователя и бота
*/

class Game {
	constructor() {
		this.state = 'play'   // если 'play', то игра начнется с этой стадии миную расстановку кораблей ( нужно вызвать randoming )
		this.isPlayerOrder = true  	 // первый ход игрока или бота

		this.player = new Topology({  // создаем объект поля боя игрока
			offsetX: 45,
			offsetY: 90
		})
		this.player.randoming()

		this.computer = new Topology({  // создаем объект поля боя бота
			offsetX: 600,
			offsetY: 100,
			secretField: true
		})
		this.computer.randoming()	 // рандомно расставляем корабли бота


		// this.player	// заполняем поле кораблями и выстрелами
		// 	.addSheeps(
		// 		{x: 0, y: 0, direct: 0, size: 3},   // direct: 0 - горизонтальный корабль
		// 		{x: 0, y: 2, direct: 1, size: 4}		// direct: 1 - вертикальный корабль
		// 	)
		// 	.addChecks(
		// 		{x: 5, y: 5},
		// 		{x: 5, y: 4}
		// 	)

		// x - это автоматически передаваемый timestamp в callback, который мы и выведем в методе tick
		this.requestId = requestAnimationFrame(x => this.tick(x)) 
	}

	tick (timestamp) {  
		clearCanvas() // примерно 60 раз в секунду очищаем канвас 
		drawGrid ()  // рисуем разлиновку тетради в клетку

		this.player.draw(ctx) // и заново отрисовываем корабли и выстрелы игрока
		this.computer.draw(ctx) // и заново отрисовываем корабли, но если поле secretField равно true не показываем их 

		if (this.state == 'preparation') {
			this.tickPreparation(timestamp)
		} else if (this.state == 'play') {
			this.tickPlay(timestamp)
		}

		mouse.previouseLeftBtn = mouse.leftBtn  // меняем previouseLeftBtn на текущее состояние после каждого обновления экрана

		requestAnimationFrame(x => this.tick(x))
		// console.log(timestamp)	// замеряем время с начала игры (загрузки скрипта), выводя его в консоль 60 раз в секунду (60 fps)
	}


	// выполняется пока не выставим все корабли на своем поле
	tickPreparation(timestamp) {
		if (!this.player.isMouseUnder(mouse)) {  // если не над своим полем боя, то выходим
			return
		}

		const sheepSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
		// т.к. 0 кораблей изначально выставлено у текущего пользователя, то мы берем 0 элемент - четырехпалубный;
		// после установки четырехпалубного this.player.sheeps.length == 1, поэтому следующий трехпалубный и тд
		const sheepsize = sheepSizes[this.player.sheeps.length]

		// получаем координаты и на их основании создаем корабль с текущим размером
		const coordinates = this.player.getCoordinates(mouse)
		const sheep = {
			x: coordinates.x,
			y: coordinates.y,
			direct: mouse.scroll ? 0 : 1,
			size: sheepsize
		}

		// если корабль вылазит за пределы поля, то выходим
		if (!this.player.canStand(sheep)) {
			return
		}
		// если не вылазит, то отрисовываем его, а точнее пока просто показываем на поле; с каждым обновлением экрана сначала очищаем канвас 
		// в методе tick, а затем сразу показываем корабль на координатах мыши - для понимания, что он может быть установлен на этом месте
		this.player.drawSheeps(ctx, sheep)

		if (mouse.leftBtn && !mouse.previouseLeftBtn) {  // если в этой итерации левая кнопка была нажата
			this.player.addSheeps(sheep)  // то добавляем корабль в наш массив, откуда он потом выставится на поле

			// если поставили последний 10й корабль, то меняем стадию игры на следующию - play
			if (this.player.sheeps.length == 10) {
				console.log('стадия игры меняется, расстановка закончена, ведем бой')
				this.state = 'play'
			}
		}
	}

	// выполняется пока кто то не победит
	tickPlay(timestamp) {

		// если ход игрока
		if (this.isPlayerOrder) {
			// если мышка не над полем бота, то выходим
			if (!this.computer.isMouseUnder(mouse)) {
				return
			}
			// иначе получаем координаты  
			const point = this.computer.getCoordinates(mouse)
			// и если мышь была нажата
			if (mouse.leftBtn && !mouse.previouseLeftBtn) {
				this.computer.addChecks(point) // то добавляем выстрел в массив выстрелов
				// update проверяет что не продублировались чекнутые поля (не стрелять в одну точку несколько раз); если чекнутые 
				// поля оказались ранениями, то они добавляются в ранения; если сумма ранений равна длине корабля, то корабль убит
				this.computer.update()

				if ( this.computer.kills.length == 10 ) {
					cancelAnimationFrame(this.requestId)
					alert('GAME OVER! you WIN!!!')
				}

				this.isPlayerOrder = false  // передаем ход боту после выстрела
			}
		} 

		// если ход бота
		else {
			const point = {  // случайная координата без каких либо проверок на соседние с кораблем точки, на выстрелы в ту же точку и тд
				x: Math.floor(Math.random() * 10),
				y: Math.floor(Math.random() * 10)
			}

			this.player.addChecks(point)
			this.player.update(point)

			if ( this.player.kills.length == 10 ) {
				cancelAnimationFrame(this.requestId)
				alert('GAME OVER! computer WIN!!!')
			}

			this.isPlayerOrder = true
		}
	}

}