let emptyPosition;

var enviroment;

function setup(){
	noLoop();
}

function draw() {
	var canvas = createCanvas(240, 240);
	canvas.parent('canvas-wrapper');
	fillCanvas();
	enviroment = fillRandomNumer();
	console.log(enviroment);
	emptyPosition = new EmptyPosition(enviroment['start']['x'],enviroment['start']['y']);
	emptyPosition.display();
	console.log(emptyPosition);
}

//field grid with state small_goals, big_goals and death_state with color(green, yellow and red)
function fillCanvas(){
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");
	
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

function fillRandomNumer(){
	var enviroment = {};
	
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");
			
	var positions = [ 
		[20,40],[20,100],[20,160],[20,220],
		[80,40],[80,100],[80,160],[80,220],
		[140,40],[140,100],[140,160],[140,220],
		[200,40],[200,100],[200,160],[200,220]
	];
	ctx.font = "30px Arial";
	ctx.fillStyle = "black";
	for(let i = 1; i<16; i++){
		let random_position = Math.floor(Math.random() * positions.length);
		ctx.fillText(i, positions[random_position][0], positions[random_position][1]);
		var state = {
			"x":positions[random_position][0],
			"y":positions[random_position][1],
			"value":i
		};
		enviroment['state_'+i] = state;
		positions.splice(random_position, 1);
	}
	
	enviroment['start'] = {
		"x" : positions[0][0],
		"y" : positions[0][1]
	};
	
	return enviroment;
}

function fillSolutionNumer(){
	var enviroment = {};
	
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");
			
	var positions = [ 
		[20,40],[80,40],[140,40],[200,40],
		[20,100],[80,100],[140,100],[200,100],
		[20,160],[80,160],[140,160],[200,160],
		[20,220],[80,220],[140,220],[200,220]
	];
	ctx.font = "30px Arial";
	ctx.fillStyle = "black";
	let i = 1;
	for(i; i<16; i++){
		ctx.fillText(i, positions[i-1][0], positions[i-1][1]);
		var state = {
			"x":positions[i-1][0],
			"y":positions[i-1][1],
			"value":i
		};
		enviroment['state_'+i] = state;
	}
	
	enviroment['start'] = {
		"x" : positions[i-1][0],
		"y" : positions[i-1][1]
	};
	
	return enviroment;
}

random = document.getElementById('random');
random.onclick = function(){
	clear();
	fillCanvas();
	enviroment = fillRandomNumer();
	console.log(enviroment);
	emptyPosition = new EmptyPosition(enviroment['start']['x'],enviroment['start']['y']);
	emptyPosition.display();
	console.log(emptyPosition);
}

solution = document.getElementById('solution');
solution.onclick = function(){
	clear();
	fillCanvas();
	enviroment = fillSolutionNumer();
	console.log(enviroment);
	emptyPosition = new EmptyPosition(enviroment['start']['x'],enviroment['start']['y']);
	emptyPosition.display();
	console.log(emptyPosition);
}

startlearn = document.getElementById('startlearn');
startlearn.onclick = function(){
	// clear();
	emptyPosition.moveDown();
	emptyPosition.display();
}