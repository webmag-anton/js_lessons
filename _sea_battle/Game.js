
/*	
	класс Game отвечает за этапы игры, отслеживание кликов по вражескому полю...
	хранит логику и алгоритм обработки действий пользователя		
*/

class Game {
	constructor() {
		this.state = 'preparation'

		this.player = new Topology({  // создаем объект поля боя игрока
			offsetX: 45,
			offsetY: 90
		})

		this.computer = new Topology({  // создаем объект поля боя бота
			offsetX: 600,
			offsetY: 100
		})

		// this.player	// заполняем поле кораблями и промахами
		// 	.addSheeps(
		// 		{x: 0, y: 0, direct: 0, size: 3},   // direct: 0 - горизонтальный корабль
		// 		{x: 0, y: 2, direct: 1, size: 4}		// direct: 1 - вертикальный корабль
		// 	)
		// 	.addChecks(
		// 		{x: 5, y: 5},
		// 		{x: 5, y: 4}
		// 	)

		// x - это автоматически передаваемый timestamp в callback, который мы и выведем в методе tick
		requestAnimationFrame(x => this.tick(x)) 
	}

	tick (timestamp) {  
		requestAnimationFrame(x => this.tick(x))
		// console.log(timestamp)	// замеряем время с начала игры (загрузки скрипта), выводя его в консоль 60 раз в секунду (60 fps)

		clearCanvas() // примерно 60 раз в секунду очищаем канвас 
		drawGrid ()  // рисуем разлиновку тетради в клетку

		this.player.draw(ctx) // и заново отрисовываем корабли и промахи игрока
		this.computer.draw(ctx) // и заново отрисовываем корабли и промахи бота

		if (this.state == 'preparation') {
			this.tickPreparaton(timestamp)
		}
	}

	tickPreparaton(timestamp) {

	}

}