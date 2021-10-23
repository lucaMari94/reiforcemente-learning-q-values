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
	const grid_x = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570, 630, 690];
	const grid_y = [30, 90, 150];
	clear();
	obj['big_goals_0']['x'] = grid_x[Math.floor(Math.random() * grid_x.length)];
	obj['big_goals_0']['y'] = grid_y[Math.floor(Math.random() * grid_y.length)];
}

goalposition = document.getElementById('goalposition');
var table = document.getElementById("goaltable");

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
				
				table.rows[3].cells[0].innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>';
				
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
	
	if(parseInt(pos[0]) === 30 && parseInt(pos[1]) === 210){
		alert("occupied position");
		ok = false;
	}
	
	if(ok){
		obj['big_goals_0']['x'] = parseInt(pos[0]);
		obj['big_goals_0']['y'] = parseInt(pos[1]);
		document.getElementById("closemodal").click();
	}
}