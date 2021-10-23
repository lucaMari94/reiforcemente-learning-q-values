stoplearn = document.getElementById('stoplearn');
stoplearn.onclick = function(){
	try{
		clearTimeout(timeout);
	} catch(err){}
};

startlearn = document.getElementById('startlearn');
startlearn.onclick = function(){
	document.getElementById('setparameter').style.display = 'none';
	document.getElementById('setparameterContent').style.display = 'none';
	document.getElementById('setalgorithm').style.display = 'none';
	document.getElementById('choosealgorithm').style.display = 'none';
	document.getElementById('valueAlpha').innerHTML = alfa;
	document.getElementById('valueGamma').innerHTML = gamma;
	document.getElementById('c_algorithm').innerHTML = algorithm;
	timeout = setTimeout(function() { 
		if(algorithm === "qlearning"){
			qlearning_algorithm();
		} else if(algorithm === "sarsa"){
			sarsa_algorithm(); 
		}
	}, 1000);
	timeout_speed = 1000;
};

accelerateslearn =  document.getElementById('accelerateslearn');
accelerateslearn.onclick = function(){
	timeout_speed = 1;
}

goalrandom = document.getElementById('goalrandom');
goalrandom.onclick = function(){
	
	const grid_x = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570];
	const grid_y =  [30, 90, 150, 210, 270, 330, 390, 450, 510];
	
	var x = grid_x[Math.floor(Math.random() * grid_x.length)];
	var y = grid_y[Math.floor(Math.random() * grid_y.length)];

	for(var i=0; i < death_state; i++){
		if(x === obj['death_state_'+i]['x'] && y === obj['death_state_'+i]['y']){
			x = grid_x[Math.floor(Math.random() * grid_x.length)];
			y = grid_y[Math.floor(Math.random() * grid_y.length)];
			i=0;
		}
	}
	
	if(x == obj['pos_x_start'] && y == obj['pos_y_start']){
		x = grid_x[Math.floor(Math.random() * grid_x.length)];
		y = grid_y[Math.floor(Math.random() * grid_y.length)];
	}
	obj['big_goals_0']['x'] = x;
	obj['big_goals_0']['y'] = y;
	
	clear();
}

cliffinitial = document.getElementById('cliffinitial');
cliffinitial.onclick = function(){
	var x = 30;
	const p_grid = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570];
	
	for(var i=0; i < death_state; i++){
		//clear();
		delete obj['death_state_'+i];
	}
	
	for(var i=0; i < 8; i++){
		
		x = x + 60;
		y = 570;
		
		var death_state_value = {
			"x":x,
			"y":y
		};
		
		clear();
		death_state = 8;
		obj['death_state_'+i] = death_state_value;
	}
}

deathrandom = document.getElementById('deathrandom');
deathrandom.onclick = function(){
	
	const p_grid = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570];
	
	for(var i=0; i < death_state; i++){
		
		var x = p_grid[Math.floor(Math.random() * p_grid.length)];
		var y = p_grid[Math.floor(Math.random() * p_grid.length)];
		
		while(x === obj['big_goals_0']['x'] && y === obj['big_goals_0']['y']){
			x = p_grid[Math.floor(Math.random() * p_grid.length)];
			y = p_grid[Math.floor(Math.random() * p_grid.length)];
		}
		
		while(x === obj['pos_x_start'] && y === obj['pos_y_start']){
			x = p_grid[Math.floor(Math.random() * p_grid.length)];
			y = p_grid[Math.floor(Math.random() * p_grid.length)];
		}
		
		var death_state_value = {
			"x":x,
			"y":y
		};
		clear();
		
		obj['death_state_'+i] = death_state_value;
	}
}

adddeathrandom = document.getElementById('adddeathrandom');
adddeathrandom.onclick = function(){
	const p_grid = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570];
	
	var x = p_grid[Math.floor(Math.random() * p_grid.length)];
	var y = p_grid[Math.floor(Math.random() * p_grid.length)];
	
	while(x === obj['big_goals_0']['x'] && y === obj['big_goals_0']['y']){
		x = p_grid[Math.floor(Math.random() * p_grid.length)];
		y = p_grid[Math.floor(Math.random() * p_grid.length)];
	}
		
	while(x === obj['pos_x_start'] && y === obj['pos_y_start']){
		x = p_grid[Math.floor(Math.random() * p_grid.length)];
		y = p_grid[Math.floor(Math.random() * p_grid.length)];
	}
	
	var death_state_value = {
		"x":x,
		"y":y
	};
	clear();
	
	obj['death_state_'+death_state] = death_state_value;
	death_state = death_state+1;
}

function verify_pos_goal_570_570(){
	for(var i=0; i < death_state; i++){
		if(570 === obj['death_state_'+i]['x'] && 570 === obj['death_state_'+i]['y']){
			return true;
		}
	}
	return false;
}


hardbtn = document.getElementById('hardbtn');
hardbtn.onclick = function(){
	
	for(var i=0; i < death_state; i++){
		delete obj['death_state_'+i];
	}
	
	delete obj["big_goals_0"]["x"];
	delete obj["big_goals_0"]["y"];
	clear();
	death_state = 31;
	
	clear();
	obj["big_goals_0"]["x"] = 450;
	obj["big_goals_0"]["y"] = 30;
	
	obj["death_state_0"] = [];
	obj["death_state_0"]["x"]= 330;
	obj["death_state_0"]["y"] = 510;
	obj["death_state_1"] = [];
	obj["death_state_1"]["x"]= 570;
	obj["death_state_1"]["y"] = 450;
	obj["death_state_2"] = [];
	obj["death_state_2"]["x"]= 330;
	obj["death_state_2"]["y"] = 570;
	obj["death_state_3"] = [];
	obj["death_state_3"]["x"]= 330;
	obj["death_state_3"]["y"] = 450;
	obj["death_state_4"] = [];
	obj["death_state_4"]["x"]= 90;
	obj["death_state_4"]["y"] = 510;
	obj["death_state_5"] = [];
	obj["death_state_5"]["x"]= 150;
	obj["death_state_5"]["y"] = 450;
	obj["death_state_6"] = [];
	obj["death_state_6"]["x"]= 390;
	obj["death_state_6"]["y"] = 90;
	obj["death_state_7"] = [];
	obj["death_state_7"]["x"]= 30;
	obj["death_state_7"]["y"] = 270;
	obj["death_state_8"] = [];
	obj["death_state_8"]["x"]= 570;
	obj["death_state_8"]["y"] = 390;
	obj["death_state_9"] = [];
	obj["death_state_9"]["x"]= 330;
	obj["death_state_9"]["y"] = 150;
	obj["death_state_10"] = [];
	obj["death_state_10"]["x"]= 30;
	obj["death_state_10"]["y"] = 90;
	obj["death_state_11"] = [];
	obj["death_state_11"]["x"]= 450;
	obj["death_state_11"]["y"] = 210;
	obj["death_state_12"] = [];
	obj["death_state_12"]["x"]= 150;
	obj["death_state_12"]["y"] = 270;
	obj["death_state_13"] = [];
	obj["death_state_13"]["x"]= 210;
	obj["death_state_13"]["y"] = 150;
	obj["death_state_14"] = [];
	obj["death_state_14"]["x"]= 30;
	obj["death_state_14"]["y"] = 510;
	obj["death_state_15"] = [];
	obj["death_state_15"]["x"]= 450;
	obj["death_state_15"]["y"] = 390;
	obj["death_state_16"] = [];
	obj["death_state_16"]["x"]= 90;
	obj["death_state_16"]["y"] = 30;
	obj["death_state_17"] = [];
	obj["death_state_17"]["x"]= 30;
	obj["death_state_17"]["y"] = 210;
	obj["death_state_18"] = [];
	obj["death_state_18"]["x"]= 270;
	obj["death_state_18"]["y"] = 30;
	obj["death_state_19"] = [];
	obj["death_state_19"]["x"]= 90;
	obj["death_state_19"]["y"] = 330;
	obj["death_state_20"] = [];
	obj["death_state_20"]["x"]= 90;
	obj["death_state_20"]["y"] = 270;
	obj["death_state_21"] = [];
	obj["death_state_21"]["x"]= 30;
	obj["death_state_21"]["y"] = 30;
	obj["death_state_22"] = [];
	obj["death_state_22"]["x"]= 570;
	obj["death_state_22"]["y"] = 510;
	obj["death_state_23"] = [];
	obj["death_state_23"]["x"]= 390;
	obj["death_state_23"]["y"] = 150;
	obj["death_state_24"] = [];
	obj["death_state_24"]["x"]= 330;
	obj["death_state_24"]["y"] = 210;
	obj["death_state_25"] = [];
	obj["death_state_25"]["x"]= 510;
	obj["death_state_25"]["y"] = 450;
	obj["death_state_26"] = [];
	obj["death_state_26"]["x"]= 330;
	obj["death_state_26"]["y"] = 270;
	obj["death_state_27"] = [];
	obj["death_state_27"]["x"]= 150;
	obj["death_state_27"]["y"] = 30;
	obj["death_state_28"] = [];
	obj["death_state_28"]["x"]= 270;
	obj["death_state_28"]["y"] = 450;
	obj["death_state_29"] = [];
	obj["death_state_29"]["x"]= 330;
	obj["death_state_29"]["y"] = 90;
	obj["death_state_30"] = [];
	obj["death_state_30"]["x"]= 330;
	obj["death_state_30"]["y"] = 270;	
}


goalposition = document.getElementById('goalposition');

goalposition.onclick = function(){
	var table = document.getElementById("goaltable");
	if (table != null) {
		
		for (var i = 0; i < table.rows.length; i++) {
			
			for (var j = 0; j < table.rows[i].cells.length; j++){
	
				id = (table.rows[i].cells[j]).id.split('-');
				
				if(parseInt(id[0]) === obj['big_goals_0']['x'] && parseInt(id[1]) === obj['big_goals_0']['y']){
					table.rows[i].cells[j].innerHTML = '<i class="fa fa-trophy" aria-hidden="true"></i>';
				} else {
					table.rows[i].cells[j].innerHTML = '';
				}
				
				table.rows[9].cells[0].innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>';
				
				for(var z=0; z <= death_state -1 ; z++){
					if(parseInt(id[0]) === obj['death_state_'+z]['x'] && parseInt(id[1]) === obj['death_state_'+z]['y']){
						table.rows[i].cells[j].innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
					}
				}
					
				table.rows[i].cells[j].onclick = function () {
					click(this);
				};
			}
		}
	}
}

function click(tableCell) {
	clear();
	pos = tableCell.id.split('-');
	var ok = true;
	
	for(var z=0; z <= death_state -1 ; z++){
		if(parseInt(pos[0]) === obj['death_state_'+z]['x'] && parseInt(pos[1]) === obj['death_state_'+z]['y']){
			alert("occupied position");
			ok = false;
		}
	}
	
	if(parseInt(pos[0]) === obj['big_goals_0']['x'] && parseInt(pos[1]) === obj['big_goals_0']['y']){
		ok = false;
	}
	
	if(parseInt(pos[0]) === 30 && parseInt(pos[1]) === 570){
		alert("occupied position");
		ok = false;
	}
	
	if(ok){
		obj['big_goals_0']['x'] = parseInt(pos[0]);
		obj['big_goals_0']['y'] = parseInt(pos[1]);
		document.getElementById("closemodal").click();
	}
}


cliffposition = document.getElementById('cliffposition');

cliffposition.onclick = function(){
	var table = document.getElementById("clifftable");
	if (table != null) {
		
		for (var i = 0; i < table.rows.length; i++) {
			
			for (var j = 0; j < table.rows[i].cells.length; j++){
	
				id = (table.rows[i].cells[j]).id.split('-');
				
				if(parseInt(id[0]) === obj['big_goals_0']['x'] && parseInt(id[1]) === obj['big_goals_0']['y']){
					table.rows[i].cells[j].innerHTML = '<i class="fa fa-trophy" aria-hidden="true"></i>';
				} else {
					table.rows[i].cells[j].innerHTML = '';
				}
				
				table.rows[9].cells[0].innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>';
				
				for(var z=0; z <= death_state -1 ; z++){
					if(parseInt(id[0]) === obj['death_state_'+z]['x'] && parseInt(id[1]) === obj['death_state_'+z]['y']){
						table.rows[i].cells[j].innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
					}
				}
					
				table.rows[i].cells[j].onclick = function () {
					clickCliff(this);
				};
			}
		}
	}
}

function clickCliff(tableCell) {
	clear();
	pos = tableCell.id.split('-');
	var ok = true;
	
	for(var z=0; z <= death_state -1 ; z++){
		if(parseInt(pos[0]) === obj['death_state_'+z]['x'] && parseInt(pos[1]) === obj['death_state_'+z]['y']){
			alert("occupied position");
			ok = false;
		}
	}
	
	if(parseInt(pos[0]) === obj['big_goals_0']['x'] && parseInt(pos[1]) === obj['big_goals_0']['y']){
		alert("occupied position");
		ok = false;
	}
	
	if(parseInt(pos[0]) === 30 && parseInt(pos[1]) === 570){
		alert("occupied position");
		ok = false;
	}
	
	if(ok){
		var death_state_value = {
			"x":parseInt(pos[0]),
			"y":parseInt(pos[1])
		};
		obj['death_state_'+death_state] = death_state_value;
		death_state++;
		document.getElementById("closemodalcliff").click();
	}
}