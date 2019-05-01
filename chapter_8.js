                 

                		/***   ООП в функциональном стиле   ***/


// Внутренний интерфейс – это свойства и методы, доступ к которым 
// может быть осуществлен только из других методов объекта, их также 
// называют «приватными» (есть и другие термины, встретим их далее).

// Внешний интерфейс – это свойства и методы, доступные 
// снаружи объекта, их называют «публичными».

// В терминологии ООП отделение и защита внутреннего интерфейса называется инкапсуляция.


			// 8.2  Внутренний и внешний интерфейс


// // Привязка через bind

// function CoffeeMachine(power) {
//   this.waterAmount = 0;

//   var WATER_HEAT_CAPACITY = 4200;

//   var getBoilTime = function() {
//     return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//   }.bind(this);

//   function onReady() {
//     alert( 'Кофе готов!' );
//   }

//   this.run = function() {
//     setTimeout(onReady, getBoilTime());
//   };

// }

// var coffeeMachine = new CoffeeMachine(100000);
// coffeeMachine.waterAmount = 200;

// coffeeMachine.run();



	// // или



// // Сохранение this в замыкании

// function CoffeeMachine(power) {
//   this.waterAmount = 0;

//   var WATER_HEAT_CAPACITY = 4200;

//   var self = this;

//   function getBoilTime() {
//     return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//   }

//   function onReady() {
//     alert( 'Кофе готов!' );
//   }

//   this.run = function() {
//     setTimeout(onReady, getBoilTime());
//   };

// }

// var coffeeMachine = new CoffeeMachine(100000);
// coffeeMachine.waterAmount = 200;

// coffeeMachine.run();









// function CoffeeMachine(power) {
//   this.waterAmount = 0;

//   var WATER_HEAT_CAPACITY = 4200;

//   var self = this;

//   function getBoilTime() {
//     return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//   }

//   function onReady() {
//     alert( 'Кофе готово!' );
//   }

//   var timerId;

//   this.run = function() {
//     timerId = setTimeout(onReady, getBoilTime());
//   };

//   this.stop = function() {
//   	clearTimeout(timerId);
//   };

// }


// var coffeeMachine = new CoffeeMachine(50000);
// coffeeMachine.waterAmount = 200;

// coffeeMachine.run();
// coffeeMachine.stop(); // кофе приготовлен не будет






			// 8.3  Геттеры и сеттеры



// // сеттер

// function CoffeeMachine(power, capacity) { // capacity - ёмкость кофеварки
//   var waterAmount = 0;

//   var WATER_HEAT_CAPACITY = 4200;

//   function getTimeToBoil() {
//     return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//   }

//   // "умная" установка свойства
//   this.setWaterAmount = function(amount) {
//     if (amount < 0) {
//       throw new Error("Значение должно быть положительным");
//     }
//     if (amount > capacity) {
//       throw new Error("Нельзя залить воды больше, чем " + capacity);
//     }

//     waterAmount = amount;
//   };

//   function onReady() {
//     alert( 'Кофе готов!' );
//   }

//   this.run = function() {
//     setTimeout(onReady, getTimeToBoil());
//   };

// }

// var coffeeMachine = new CoffeeMachine(50000, 500);
// coffeeMachine.setWaterAmount(600); // упс, ошибка!
// coffeeMachine.run();








// // Единый геттер-сеттер

// function CoffeeMachine(power, capacity) {
//   var waterAmount = 0;

//   this.waterAmount = function(amount) {
//     // вызов без параметра, значит режим геттера, возвращаем свойство
//     if (!arguments.length) return waterAmount;

//     // иначе режим сеттера
//     if (amount < 0) {
//       throw new Error("Значение должно быть положительным");
//     }
//     if (amount > capacity) {
//       throw new Error("Нельзя залить воды больше, чем " + capacity);
//     }

//     waterAmount = amount;
//   };

// }

// var coffeeMachine = new CoffeeMachine(1000, 500);

// // пример использования
// coffeeMachine.waterAmount(450);
// alert( coffeeMachine.waterAmount() ); // 450








// function User() {
// 	var firstName,
// 			surname;

// 	this.setFirstName = function(par) {
// 		firstName = par;
// 	};

// 	this.setSurname = function(par) {
// 		surname = par;
// 	};

// 	this.getFullName = function() {
// 		return firstName + ' ' +  surname;
// 	}

// };


// var user = new User();
// user.setFirstName("Петя");
// user.setSurname("Иванов");

// alert( user.getFullName() ); // Петя Иванов








// function CoffeeMachine(power, capacity) {
//   var waterAmount = 0;

//   var WATER_HEAT_CAPACITY = 4200;

//   function getTimeToBoil() {
//     return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//   }

//   this.setWaterAmount = function(amount) {
//     if (amount < 0) {
//       throw new Error("Значение должно быть положительным");
//     }
//     if (amount > capacity) {
//       throw new Error("Нельзя залить больше, чем " + capacity);
//     }

//     waterAmount = amount;
//   };

//   this.addWater = function(amount) {
//     this.setWaterAmount(waterAmount + amount);
//   };

//   function onReady() {
//     alert( 'Кофе готов!' );
//   }

//   this.run = function() {
//     setTimeout(onReady, getTimeToBoil());
//   };

// }


// var coffeeMachine = new CoffeeMachine(100000, 400);
// coffeeMachine.addWater(200);
// coffeeMachine.addWater(100);
// coffeeMachine.addWater(300); // Нельзя залить больше, чем 400
// coffeeMachine.run();









// function CoffeeMachine(power, capacity) {
//   var waterAmount = 0;

//   var WATER_HEAT_CAPACITY = 4200;

//   function getTimeToBoil() {
//     return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//   }

//   this.setWaterAmount = function(amount) {
//     if (amount < 0) {
//       throw new Error("Значение должно быть положительным");
//     }
//     if (amount > capacity) {
//       throw new Error("Нельзя залить больше, чем " + capacity);
//     }

//     waterAmount = amount;
//   };

//   this.getWaterAmount = function() {
//     return waterAmount;
//   };

//   function onReady() {
//   	alert( 'Кофе готов!' );
//   }

//   // метод setOnReady делает из Fun Declar onReady - Fun Expr onReady
//   this.setOnReady = function(func) {
//   	onReady = func;
//   }


//   // т.к есть таймер, то что бы можно было переопределять ф-ю onReady 
//   // (методом setOnReady) после вызова метода run - заворачиваем 
//   // onReady в анонимную ф-ю !!!  
//   // alert'ы для наглядности (можно удалить)
//   this.run = function() {
//     setTimeout( function() { onReady(); alert(onReady);}, getTimeToBoil());
//     alert(onReady);
//   };

// }



// var coffeeMachine = new CoffeeMachine(20000, 500);
// coffeeMachine.setWaterAmount(150);

// coffeeMachine.run();

// coffeeMachine.setOnReady(function() {
//   var amount = coffeeMachine.getWaterAmount();
//   alert( 'Готов кофе: ' + amount + 'мл' ); // Готов кофе: 150 мл
// });










// function CoffeeMachine(power, capacity) {
//   var waterAmount = 0;

//   var WATER_HEAT_CAPACITY = 4200;

//   var timerId;

//   this.isRunning = function() {
//     return !!timerId;
//   };

//   function getTimeToBoil() {
//     return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//   }

//   this.setWaterAmount = function(amount) {
//     if (amount < 0) {
//       throw new Error("Значение должно быть положительным");
//     }
//     if (amount > capacity) {
//       throw new Error("Нельзя залить больше, чем " + capacity);
//     }

//     waterAmount = amount;
//   };

//   this.getWaterAmount = function() {
//     return waterAmount;
//   };

//   function onReady() {
//   	alert( 'Кофе готов!' );
//   }

//   this.setOnReady = function(func) {
//   	onReady = func;
//   }

//   this.run = function() {
//     timerId = setTimeout( function() {timerId = null;  onReady(); }, getTimeToBoil());
//   };

// }



// var coffeeMachine = new CoffeeMachine(20000, 500);
// coffeeMachine.setWaterAmount(100);

// alert( 'До: ' + coffeeMachine.isRunning() ); // До: false

// coffeeMachine.run();
// alert( 'В процессе: ' + coffeeMachine.isRunning() ); // В процессе: true

// coffeeMachine.setOnReady(function() {
//   alert( "После: " + coffeeMachine.isRunning() ); // После: false
// });








      // 8.4  Функциональное наследование



// function Machine() {
// 	var enabled = false;

// 	this.enable = function() {
// 		enabled = true;
// 	};

// 	this.disable = function() {
// 		enabled = false;
// 	};
// }



// function CoffeeMachine(power) {
//   Machine.call(this); // отнаследовать

//   var waterAmount = 0;

//   this.setWaterAmount = function(amount) {
//     waterAmount = amount;
//   };

// }

// var coffeeMachine = new CoffeeMachine(10000);

// coffeeMachine.enable();
// coffeeMachine.setWaterAmount(100);
// coffeeMachine.disable();








// // Защищённые свойства ( начинаются с _ )


// function Machine() {
//   var enabled = false;

//   this.enable = function() {
//     enabled = true;
//   };

//   this.disable = function() {
//     enabled = false;
//   };
// }

// function CoffeeMachine(power) {
//   Machine.call(this);

//   this.enable();

//   // ошибка, переменная не определена!
//   // Наследник не имеет доступа к приватным свойствам родителя.
//   alert( enabled );
// }

// var coffeeMachine = new CoffeeMachine(10000);









// function Machine(power) {
//   this._power = power;

//   this._enabled = false;

//   this.enable = function() {
//     this._enabled = true;
//   };

//   this.disable = function() {
//     this._enabled = false;
//   };
// }

// function CoffeeMachine(power) {
//   Machine.apply(this, arguments);

//   alert( this._enabled ); // false
//   alert( this._power ); // 10000
// }

// var coffeeMachine = new CoffeeMachine(10000);











// function Machine(power) {
//   this._enabled = false;

//   var self = this;

//   this.enable = function() {
//     self._enabled = true;
//   };

//   this.disable = function() {
//     self._enabled = false;
//   };

// }

// function CoffeeMachine(power) {
//   Machine.apply(this, arguments);

//   var waterAmount = 0;

//   this.setWaterAmount = function(amount) {
//     waterAmount = amount;
//   };

//   function onReady() {
//     alert( 'Кофе готово!' );
//   }

//   this.run = function() {
//   	if (!this._enabled) {
//   		throw new Error('ошибка, кофеварка выключена!');
//   	}
//     setTimeout(onReady, 1000);
//   };

// }

// var coffeeMachine = new CoffeeMachine(10000);
// // coffeeMachine.enable();
// coffeeMachine.run(); // ошибка, кофеварка выключена!















function Machine(power) {
  this._enabled = false;

  var self = this;

  this.enable = function() {
    self._enabled = true;
  };

  this.disable = function() {
    self._enabled = false;
  };

}

function CoffeeMachine(power) {
  Machine.apply(this, arguments);

  var waterAmount = 0;

  var timeoutId;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
  	if (!this._enabled) {
  		throw new Error('ошибка, кофеварка выключена!');
  	}

    timeoutId = setTimeout(onReady, 1000);
  };

  // переопределяем метод
  var oldDisable = this.disable;
  this.disable = function() {
  	oldDisable();

  	clearInterval(timeoutId);
  }

}

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.enable();
coffeeMachine.run();
coffeeMachine.disable(); // остановит работу, ничего не выведет