// function: increase the global variable of the episode number
function increment_episod_number(){
    episod_number = episod_number + 1;
}

function setStateDeathAndWin(death_state, small_goals, big_goals){
	const p_grid = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570];
	var obj = {};
	
	obj['pos_x_start'] = pos_x_init;
	obj['pos_y_start'] = pos_y_init;
	
	x = pos_x_init;
	
	for(i=0; i < big_goals; i++){
		var x = 570;
		var y = 570;
		
		var big_goals_value = {
			"x":x,
			"y":y
		};
		obj['big_goals_'+i] = big_goals_value
	}
	
	for(i=0; i < death_state; i++){
		var x = p_grid[Math.floor(Math.random() * p_grid.length)];
		var y = p_grid[Math.floor(Math.random() * p_grid.length)];
		
		while(x === obj['big_goals_0']['x'] && y === obj['big_goals_0']['y']){
			x = p_grid[Math.floor(Math.random() * p_grid.length)];
			y = p_grid[Math.floor(Math.random() * p_grid.length)];
		}
		
		var death_state_value = {
			"x":x,
			"y":y
		};
		obj['death_state_'+i] = death_state_value;
	}
	
	for(i=0; i < small_goals; i++){
		var x = p_grid[Math.floor(Math.random() * p_grid.length)];
		var y = p_grid[Math.floor(Math.random() * p_grid.length)];
		
		var small_goals_value = {
			"x":x,
			"y":y
		};
		obj['small_goals_'+i] = small_goals_value
	}
	
	console.log(obj);
	return obj;
}

//function: fill canvas with grid
function fillCanvas() {
	
	var canvas = document.querySelector('canvas');
	
	var canvas_width = canvas.width;
	var canvas_height = canvas.height;
	
	var ctx = canvas.getContext('2d');
	
	ctx.lineWidth=4;
		
	for(i=0; i<=canvas_width; i=i+60)
	{
		ctx.moveTo(i,0);
		ctx.lineTo(i,canvas_width);
		ctx.stroke(); 
	}
	
	for(j=0; j<=canvas_width; j=j+60)
	{
		ctx.moveTo(0,j);
		ctx.lineTo(canvas_width,j);
		ctx.stroke(); //draw the line
	}
}

//field grid with state small_goals, big_goals and death_state with color(green, yellow and red)
function fillGridWithGoals(obj){
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");
  
	for(i=0; i < big_goals; i++){ 
		var colorbox = obj['big_goals_'+i];
		ctx.fillStyle = "green";
		ctx.fillRect(colorbox['x']-30, colorbox['y']-30, 58, 58);
	}

	for(i=0; i < small_goals; i++){ 
		var colorbox = obj['small_goals_'+i];
		ctx.fillStyle = "yellow";
		ctx.fillRect(colorbox['x']-30, colorbox['y']-30, 58, 58);
	}
	
	for(i=0; i < death_state; i++){ 
		var colorbox = obj['death_state_'+i];
		ctx.fillStyle = "red";
		ctx.fillRect(colorbox['x']-30, colorbox['y']-30, 58, 58);
	}
	
	//stato iniziale
	ctx.fillStyle = "silver";
	ctx.fillRect(pos_x_init-30, pos_y_init-30, 58, 58);
	textSize(16);
	
	ctx.font = '900 42px "FontAwesome"';

	ctx.fillStyle = "#505050";
	ctx.fillText("\uf024", 10, 570+15);
	
	ctx.fillStyle = "#003400";
	ctx.fillText("\uf091", obj['big_goals_0']['x']-20, obj['big_goals_0']['y']+15);
	
	ctx.fillStyle = "#a50000";
	
	for(var u=0; u < death_state; u++) ctx.fillText("\uf071", obj['death_state_'+u]['x'] - 22, obj['death_state_'+u]['y'] + 15);
	
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 0, 0);
}

function updateView(state, action){
	var rowqtable = document.getElementById(state);
	var coloumn;
	if(action === "up") coloumn = 1;
	if(action === "down") coloumn = 2;
	if(action === "right") coloumn = 3;
	if(action === "left") coloumn = 4;
	
	rowqtable.cells.item(coloumn).innerHTML = qtable[state][action];
}

function incrementWinAndDeath(){
	var span_numberofdead = document.getElementById("numberofdead");
	span_numberofdead.innerHTML = numberofdead;

	var span_numberofdvictories = document.getElementById("numberofvictories");
	span_numberofdvictories.innerHTML = numberofvictories;
}

(function() {
  'use strict';
  window.addEventListener('load', function() {
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.getElementsByClassName('needs-validation');
	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(forms, function(form) {
	  form.addEventListener('submit', function(event) {
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			setParameter();
			event.preventDefault();
			event.stopPropagation();
		}
		form.classList.add('was-validated');
	  }, false);
	});
  }, false);
})();