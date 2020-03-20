const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const ground = new Image()
ground.src = 'field.png'

const foodImg = new Image()
foodImg.src = 'food.png'

let score = 0,
		box = 32, // размер ячейки поля
		food = { // еда располагается случайным образом
			x: getRandomIntInclusive(1, 17) * box,	 // 17 ячеек по горизонтали
			y: getRandomIntInclusive(3, 17) * box		 // 15 ячеек по вертикали (верхний зеленый бот поля занимает 3 ячейки)
		},
		snake = [],
		direction


// getRandomIntInclusive хоть и стоит за food, но будет видна в силу hoisting (всплытия)
function getRandomIntInclusive(min, max) { // случайные целые числа, где максимум и минимум включаются
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// изначально змейка должна находится по центру  ( первый элемент snake[0] - голова )
snake[0] = {
	x: 9 * box,
	y: 10 * box
}	

document.addEventListener('keydown', e =>  {
	if (e.code == 'ArrowLeft' && direction != 'right') {  // если движемся вправо, то нельзя двигаться влево
		direction = 'left'
	} else if (e.code == 'ArrowUp' && direction != 'down') {
		direction = 'up'
	} else if (e.code == 'ArrowRight' && direction != 'left') {
		direction = 'right'
	} else if (e.code == 'ArrowDown' && direction != 'up') {
		direction = 'down'
	}
})


let fps = 5

function drawGame(timestamp) {
  setTimeout( () => {
    requestAnimationFrame(drawGame)
    
    ctx.drawImage(ground, 0, 0)
		ctx.drawImage(foodImg, food.x, food.y)

		// для каждого элемента змейки рисуем квадрат
		for (let i = 0; i < snake.length; i++) {
			if ( i == 0 ) {
				ctx.fillStyle = 'red'
			} else {
				ctx.fillStyle = 'green'
			}
			ctx.fillRect( snake[i].x, snake[i].y, box, box )
		}

		// рисуем счет
		ctx.fillStyle = 'white'
		ctx.font = '50px Arial'
		ctx.fillText(score, box * 2.5, box * 1.7)

		// рисуем время игры
		ctx.fillStyle = 'darkblue'
		ctx.font = '30px Arial'
		if (direction) {  // если змейка поползла
			ctx.fillText(`time: ${Math.round(timestamp / 1000)}s`, box * 13.3, box * 1.5)
		}
		


		// координаты головы
		let snakeX = snake[0].x,
				snakeY = snake[0].y

		// если съела еду (координаты головы равны координатам еды), то хвост (последний элемент) не вырезаем, 
		// а просто дальше добавляем обновленную голову; т.е. увеличиваем змейку
		if (snakeX == food.x && snakeY == food.y) {  
			// увеличиваем счет
			score++
			// рандомно расставляем еду
			food = { 
				x: getRandomIntInclusive(1, 17) * box,	 
				y: getRandomIntInclusive(3, 17) * box		 
			}
		} else {	// если не съела, то вырезаем последний элемент змейки и вставляем его как первый, создавая движение
			snake.pop()
		}


		// меняем координаты головы в зависимости от нажатой кнопки
		if (direction == 'left') 	 snakeX -= box  // движение влево
		if (direction == 'right')  snakeX += box  // движение вправо
		if (direction == 'up')  	 snakeY -= box  // движение вверх
		if (direction == 'down')   snakeY += box  // движение вниз

		// новые координаты головы
		let newHead = {
			x: snakeX,
			y: snakeY
		}
		// вставляем голову в начало массива
		snake.unshift(newHead)

		// если голова столькнулась с хвостом
		for (i = 1; i < snake.length; i++) {
			if (newHead.x == snake[i].x  &&  newHead.y == snake[i].y) {
				alert(`Game Over! score: ${score}`)
				location.reload()
			}
		}
		// если голова столькнулась с границей поля
		if ( newHead.x < box || newHead.x > box * 18 || newHead.y < box * 3 || newHead.y > box * 17 ) {
			alert(`Game Over! score: ${score}`)
			location.reload()
		}

  }, 1000 / fps)
}

requestAnimationFrame(timestamp => {
	drawGame(timestamp)
})


