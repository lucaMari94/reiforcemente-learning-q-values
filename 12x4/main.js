function setup(){
	var canvas = createCanvas(width, height);
	canvas.parent('canvas-wrapper');
	
	obj = setStateDeathAndWin(death_state, small_goals, big_goals);
	
	robot = new Robot(obj['pos_x_start'], obj['pos_y_start']);
	
	fillGridWithGoals(obj);
}

function draw() {
	fillCanvas();
	fillGridWithGoals(obj);
	robot.display();
}

function moving_robot(move){
	switch(move){
		case 'up':
			clear();
			robot.moveUp();	
			robot.display();
            break;
        case 'down':
			clear();	
			robot.moveDown();	
			robot.display();
            break;
        case 'right':
			clear();
			robot.moveRight();	
			robot.display();
            break;
        case 'left':
			clear();
			robot.moveLeft();	
			robot.display();
            break;
	}
}

function state_is_terminal(){
	coord_position_x = robot.x;
	coord_position_y = robot.y;
	if(coord_position_x === obj['pos_x_start'] && coord_position_y === obj['pos_y_start']){
		return false;
	}
	
	for(i=0; i < small_goals; i++){ 
		goal = obj['small_goals_'+i];
		if(coord_position_x === goal['x'] && coord_position_y === goal['y']){
			robot = new Robot(obj['pos_x_start'], obj['pos_y_start']);
			return true;
		}
	}
	
	for(i=0; i < death_state; i++){ 
		goal = obj['death_state_'+i];
		if(coord_position_x === goal['x'] && coord_position_y === goal['y']){
			console.log("death");
			numberofdead++;
			incrementWinAndDeath();
			robot = new Robot(obj['pos_x_start'], obj['pos_y_start']);
			return true;
		}
	}
	
	for(i=0; i < big_goals; i++){ 
		goal = obj['big_goals_'+i];
		if(coord_position_x === goal['x'] && coord_position_y === goal['y']){
			console.log("win");
			numberofvictories++;
			incrementWinAndDeath();
			robot = new Robot(obj['pos_x_start'], obj['pos_y_start']);
			return true;
		}
	}
	return false;
}

function get_reward_value(){
	for(i=0; i < death_state; i++){ 
		var value = obj['death_state_'+i];
		if(value['x'] == robot.x && value['y'] == robot.y){ 
			return reward_death_state;
		}
	}
	
	for(i=0; i < small_goals; i++){ 
		var value = obj['small_goals_'+i];
		if(value['x'] == robot.x && value['y'] == robot.y){
			return reward_small_goals;
		}
	}
	
	for(i=0; i < big_goals; i++){
		var value = obj['big_goals_'+i];
		if(value['x'] == robot.x && value['y'] == robot.y){
			return reward_big_goals;
		}
	}
	return reward_other_state;;
}

function qlearning_algorithm(){
	function myLoop () {
	   timeout = setTimeout(function () { // While (s is not a terminal state):
		if(state_is_terminal() === false){
			
			s = robot.x.toString().concat(robot.y.toString()); //stato attutale
			
			action = chooseAction(qtable[s], epsilon_for_qlearning).split(':');
			
			moving_robot(action[0]); 
			
			reward_value = get_reward_value();
			
			sum_reward_episod = sum_reward_episod + reward_value;
			
			s2 = robot.x.toString().concat(robot.y.toString());
			
			s2_max_action = maxAction(qtable[s2], epsilon_for_qlearning).split(':');
			
			qtable[s][action[0]] = qtable[s][action[0]] + alfa * (reward_value + gamma * qtable[s2][s2_max_action[0]] - qtable[s][action[0]]);

			updateView(s, action[0]);

			state_visited++;
			
		} else {
			
			//fine episodio
			increment_episod_number();
			time = document.getElementById('time');
			
			textarea_result = document.getElementById('result');
			textarea_result.innerHTML += 'Episode: '+ episod_number + ": mosse: " +state_visited+ ';\r\n';	
			textarea_result.scrollTop = textarea_result.scrollHeight;
			
			if(reward_value === -100) addDataToChart(episod_number,state_visited, "red");
			if(reward_value === 100) addDataToChart(episod_number,state_visited, "green");
			
			total_moves = total_moves + state_visited;
			average_moves_value = total_moves/episod_number;
			average_moves = document.getElementById("averagemoves");
			average_moves.innerHTML = parseFloat(average_moves_value).toFixed(2);
			state_visited = 0;
			
			total_reward = total_reward + sum_reward_episod;
			average_reward_value = total_reward/episod_number;
			average_reward = document.getElementById("averagereward");
			average_reward.innerHTML = parseFloat(average_reward_value).toFixed(2);
			sum_reward_episod = 0;
		}
		myLoop();
	   }, timeout_speed)
	}
	
	myLoop()
}

function sarsa_algorithm(){
	
	/**
		for each episod
			Initialize s
			Choose a from s using policy derived from Q (epsilon gredy)
			for each step of episode
				take action a, observer r, s'
				choose a' from s' using policy derived from Q
				Q(s,a) = Q(s,a) + alfa [r + gamma * Q(s', a') - Q(s,a)]
				s = s'
				a = s'
			until s is terminal
	**/
	function myLoop () {
		
		if(state_visited === 0) {
			
			s = robot.x.toString().concat(robot.y.toString()); //stato iniziale
			
			action = chooseAction(qtable[s], epsilon_for_sarsa).split(':');
		}
		
	   timeout = setTimeout(function () { // While (s is not a terminal state):

		if(state_is_terminal() === false){
			
			moving_robot(action[0]);
			
			reward_value = get_reward_value();
			
			sum_reward_episod = sum_reward_episod + reward_value;
			
			s2 = robot.x.toString().concat(robot.y.toString());
			
			s2_action = chooseAction(qtable[s2], epsilon_for_sarsa).split(':');
			
			qtable[s][action[0]] = qtable[s][action[0]] + alfa * (reward_value + gamma * qtable[s2][s2_action[0]] - qtable[s][action[0]]);
			
			updateView(s, action[0]);
			
			s = s2;
			
			action = s2_action;
			
			state_visited++;
			
		} else {
			
			increment_episod_number();
			time = document.getElementById('time');
			
			textarea_result = document.getElementById('result');
			textarea_result.innerHTML += 'Episode: '+ episod_number + ": mosse: " +state_visited+ ';\r\n';	
			textarea_result.scrollTop = textarea_result.scrollHeight;
			
			if(reward_value === -100) addDataToChart(episod_number,state_visited, "red");
			if(reward_value === 100) addDataToChart(episod_number,state_visited, "green");
			
			total_moves = total_moves + state_visited;
			average_moves_value = total_moves/episod_number;
			average_moves = document.getElementById("averagemoves");
			average_moves.innerHTML = parseFloat(average_moves_value).toFixed(2);
			state_visited = 0;
			
			total_reward = total_reward + sum_reward_episod;
			average_reward_value = total_reward/episod_number;
			average_reward = document.getElementById("averagereward");
			average_reward.innerHTML = parseFloat(average_reward_value).toFixed(2);
			sum_reward_episod = 0;
		}
		  myLoop();
	   }, timeout_speed)
	}
	
	myLoop()
}
