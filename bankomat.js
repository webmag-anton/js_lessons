var question = +prompt('Введите необходимую сумму гривен (не больше 10000)', 1883);

function bankomat(question) {

	if ( question == 0 || question === '' || isNaN(question) === true || question === null ) {
		console.log('Введите корректную сумму');
		return;
	}

	var text = 'Вы ввели ' + question + ' грн: \n\n';

	var banknotes = [1, 2, 5, 10, 20, 50, 100, 200, 500];
	var banknotesRevese = banknotes.reverse();
	var amountArray = []; 

	for (i = 0; i < banknotesRevese.length; i++) {
		var item = banknotesRevese[i];

		if (question < item) {

			amountArray[i] = 0;
			continue;

		} else if (question % item == 0) {

			amountArray[i] = question / item;
			break;

		} else {

			amountArray[i] = (question - (question % item) ) / item;
			question = question % item;

		}
	}

	if(amountArray[0]) text = text + 'Купюр номиналом 500 грн - ' + amountArray[0] + ' штук(а); \n'; 
	if(amountArray[1]) text = text + 'Купюр номиналом 200 грн - ' + amountArray[1] + ' штук(а); \n';
	if(amountArray[2]) text = text + 'Купюр номиналом 100 грн - ' + amountArray[2] + ' штук(а); \n';
	if(amountArray[3]) text = text + 'Купюр номиналом 50 грн - ' + amountArray[3] + ' штук(а); \n';
	if(amountArray[4]) text = text + 'Купюр номиналом 20 грн - ' + amountArray[4] + ' штук(а); \n';
	if(amountArray[5]) text = text + 'Купюр номиналом 10 грн - ' + amountArray[5] + ' штук(а); \n';
	if(amountArray[6]) text = text + 'Купюр номиналом 5 грн - ' + amountArray[6] + ' штук(а); \n';
	if(amountArray[7]) text = text + 'Купюр номиналом 2 грн - ' + amountArray[7] + ' штук(а); \n';
	if(amountArray[8]) text = text + 'Купюр номиналом 1 грн - ' + amountArray[8] + ' штук(а); \n';

	if (question <= 10000){
		console.log( text );
	} else {
		console.log('Сумма не должна превышать 10000 грн');
	}

} bankomat(question);









// var sum = +prompt('Введите необходимую сумму гривен (не больше 10000)', 1883);

// var money_500 = 500;
// var money_200 = 200;
// var money_100 = 100;
// var money_50 = 50;
// var money_20 = 20;
// var money_10 = 10;
// var money_5 = 5;
// var money_2 = 2;
// var money_1 = 1;


// var amount_500 = Math.floor(sum / money_500);
// var amount_200 = Math.floor((sum - money_500*amount_500) / money_200);
// var amount_100 = Math.floor((sum - money_500*amount_500 - money_200*amount_200) / money_100);
// var amount_50 = Math.floor((sum - money_500*amount_500 - money_200*amount_200 - money_100*amount_100) / money_50);
// var amount_20 = Math.floor((sum - money_500*amount_500 - money_200*amount_200 - money_100*amount_100 - money_50*amount_50) / money_20);
// var amount_10 = Math.floor((sum - money_500*amount_500 - money_200*amount_200 - money_100*amount_100 - money_50*amount_50 - money_20*amount_20) / money_10);
// var amount_5 = Math.floor((sum - money_500*amount_500 - money_200*amount_200 - money_100*amount_100 - money_50*amount_50 - money_20*amount_20 - money_10*amount_10) / money_5);
// var amount_2 = Math.floor((sum - money_500*amount_500 - money_200*amount_200 - money_100*amount_100 - money_50*amount_50 - money_20*amount_20 - money_10*amount_10 - money_5*amount_5) / money_2);
// var amount_1 = Math.floor((sum - money_500*amount_500 - money_200*amount_200 - money_100*amount_100 - money_50*amount_50 - money_20*amount_20 - money_10*amount_10 - money_5*amount_5 - money_2*amount_2) / money_1);


// var text = '';

// if(amount_500 > 0) text = text + 'Купюр номиналом 500 грн - ' + amount_500 + ' штук(а); \n'; 
// if(amount_200 > 0) text = text + 'Купюр номиналом 200 грн - ' + amount_200 + ' штук(а); \n';
// if(amount_100 > 0) text = text + 'Купюр номиналом 100 грн - ' + amount_100 + ' штук(а); \n';
// if(amount_50 > 0) text = text + 'Купюр номиналом 50 грн - ' + amount_50 + ' штук(а); \n';
// if(amount_20 > 0) text = text + 'Купюр номиналом 20 грн - ' + amount_20 + ' штук(а); \n';
// if(amount_10 > 0) text = text + 'Купюр номиналом 10 грн - ' + amount_10 + ' штук(а); \n';
// if(amount_5 > 0) text = text + 'Купюр номиналом 5 грн - ' + amount_5 + ' штук(а); \n';
// if(amount_2 > 0) text = text + 'Купюр номиналом 2 грн - ' + amount_2 + ' штук(а); \n';
// if(amount_1 > 0) text = text + 'Купюр номиналом 1 грн - ' + amount_1 + ' штук(а); \n';

// if (sum <= 10000){
// 	console.log( text );
// } else {
// 	console.log('Сумма не должна превышать 10000 грн');
// }






