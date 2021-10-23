const width = 300;

const height = 300;

var positions_in_grid = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570, 530, 590];

const pos_x_init = 30;
const pos_y_init = 210;
	
var obj;

var death_state = 10; 

const small_goals = 0; 

const big_goals = 1; 

const reward_big_goals = 100;

const reward_small_goals = 1;

const reward_death_state = -100;

const reward_other_state = -1;

var qtable = [];

var episod_number = 0;

var state_visited = 0;

var move_random = ['up', 'down', 'right', 'left'];

// for sarsa algorithm
/*
p numero casuale compreso tra [0 e 1]
se p > 0.1 SFUTTAMENTO: si sceglie l'azione con R (ricompensa) massima --> 90% della volte
se p <= 0.1 ESPLORAZIONE: si sceglie un'azione casuale --> 10% della volta) */

var epsilon_for_sarsa = 0.1; //epsilon-greedy policy
var epsilon_for_qlearning = 0.05;

var gamma = 0.5; //fattore di sconto

var alfa = 0.5; //fattore di apprendimento

var timeout_speed = 1000; //timeout

var numberofdead = 0;
var numberofvictories = 0;

// for statistics
var labels = [];
var data = [];

var algorithm = "qlearning";

var total_reward = 0;
var sum_reward_episod = 0;
var average_reward_value = 0
var total_moves = 0;
var average_moves = 0; 

function setParameter() {
	alfa = document.getElementById("alfa").value;
	gamma = document.getElementById("gamma").value;
}

function choose_algorithm() {
	if(document.getElementById("qlearningchoose").checked){ algorithm = "qlearning"; }
	else if(document.getElementById("sarsachoose").checked){ algorithm = "sarsa"; }
}