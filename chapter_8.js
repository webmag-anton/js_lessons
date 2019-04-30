                 

                		/***   ООП в функциональном стиле   ***/



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
//       return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//     }

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