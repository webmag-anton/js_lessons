$(document).ready(function() {

	var desk = [
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
	];

	function drawDesk() {
		var toggle = 0;

		for (var x=0; x<desk.length; x++) {
			var row = desk[x];

			for (var y=0; y<row.length; y++) {
				if (toggle % 2 == 0) {
					$('#desk').append("<div class='desk-item white' data-x='" + 
													x + "' data-y='" + y + "'></div>");
				}
				else {
					$('#desk').append("<div class='desk-item' data-x='" + 
													x + "' data-y='" + y + "'></div>");
				}
				toggle++
			}
			toggle++
		}
	};

	drawDesk();


	$('.desk-item').click(function() {
		$('.desk-item').removeClass('active');
		$(this).addClass('active');

		var coordX = +$(this).data('x');
		var coordY = +$(this).data('y');

		$('.desk-item').removeClass('hovered');

		if (coordX+2 <= 7 && coordY+1 <= 7 ) {
			$('.desk-item[data-x="' + (coordX+2) +
			  '"][data-y="' + (coordY+1) + '"]').addClass('hovered');
		}
		if (coordX+2 <= 7 && coordY-1 >= 0 ) {
			$('.desk-item[data-x="' + (coordX+2) +
			  '"][data-y="' + (coordY-1) + '"]').addClass('hovered');
		}
		if (coordX-2 >= 0 && coordY+1 <= 7 ) {
			$('.desk-item[data-x="' + (coordX-2) +
			  '"][data-y="' + (coordY+1) + '"]').addClass('hovered');
		}
		if (coordX-2 >= 0 && coordY-1 >= 0 ) {
			$('.desk-item[data-x="' + (coordX-2) +
			  '"][data-y="' + (coordY-1) + '"]').addClass('hovered');
		}

		if (coordX+1 <= 7 && coordY+2 <= 7 ) {
			$('.desk-item[data-x="' + (coordX+1) +
			  '"][data-y="' + (coordY+2) + '"]').addClass('hovered');
		}
		if (coordX+1 <= 7 && coordY-2 >= 0 ) {
			$('.desk-item[data-x="' + (coordX+1) +
			  '"][data-y="' + (coordY-2) + '"]').addClass('hovered');
		}
		if (coordX-1 >= 0 && coordY+2 <= 7 ) {
			$('.desk-item[data-x="' + (coordX-1) +
			  '"][data-y="' + (coordY+2) + '"]').addClass('hovered');
		}
		if (coordX-1 >= 0 && coordY-2 >= 0 ) {
			$('.desk-item[data-x="' + (coordX-1) +
			  '"][data-y="' + (coordY-2) + '"]').addClass('hovered');
		}

	})

});