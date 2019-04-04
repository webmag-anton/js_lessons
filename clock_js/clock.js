$(document).ready(function() {

	var time = $('.time'),
			color = $('.hexColor');

	function clock() {

		var date = new Date();

		var h = (date.getHours() % 12).toString();
		var m = date.getMinutes().toString();
		var s = date.getSeconds().toString();

		if (h.length < 2) {
			h = '0' + h;
		}
		if (m.length < 2) {
			m = '0' + m;
		}
		if (s.length < 2) {
			s = '0' + s;
		}

		time.text( h + ":" + m + ":" + s );

		$('body').css('backgroundColor', '#' + h + m + s);
		color.text( 'color: #' + h + m + s );

	}

	clock();
	setInterval(clock, 1000);

});

