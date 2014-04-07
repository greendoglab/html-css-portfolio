$(document).ready(function() {
    $('.quot_in').cycle({ 
	    fx: 'fade', 
	    speed: 'fast', 
	    timeout: 0, 
	    next: '.qllist', 
	    prev: '.qrlist'
	});
});
function look(type){
param=document.getElementById(type);
if(param.style.display == "none") param.style.display = "block";
else param.style.display = "none"
}