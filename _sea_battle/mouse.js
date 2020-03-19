function getMouse(element) {
	const mouse = { // координаты относительно тетради
		x: 0,
		y: 0,
		scroll: false,
		leftBtn: false,
		previouseLeftBtn: false
	}

	element.addEventListener('mousemove', e => {
		const rect = element.getBoundingClientRect()
		mouse.x = e.clientX - rect.left
		mouse.y = e.clientY - rect.top
	})

	// слушаем колесо мыши, в зависимости от значения mouse.scroll будет меняться направление корабля при расстановке
	element.addEventListener('wheel', e => {
		mouse.scroll = !mouse.scroll
	})

	element.addEventListener('mousedown', e => {
		if (e.button == 0) {
			mouse.leftBtn = true
		}
	})

	element.addEventListener('mouseup', e => {
		if (e.button == 0) {
			mouse.leftBtn = false
		}
	})

	return mouse
}