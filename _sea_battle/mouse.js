function getMouse(element) {
	const mouse = { // координаты относительно тетради
		x: 0,
		y: 0
	}

	element.addEventListener('mousemove', e => {
		const rect = element.getBoundingClientRect()
		mouse.x = e.clientX - rect.left
		mouse.y = e.clientY - rect.top
	})

	return mouse
}