$(document).ready(function() {
    $('.cyclebox').before('<div class="nav">').cycle({
		fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
		pager: '.nav',
		pagerAnchorBuilder: function(idx, slide) { 
		    return '<a href="#"></a>';
		}
	});
	
});
$(document).ready(function() {
    $('.places_in').cycle({ 
	    fx: 'fade', 
	    speed: 'fast', 
	    timeout: 0, 
	    next: '.pla_left', 
	    prev: '.pla_right'
	});
});