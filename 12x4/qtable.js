class Qvalue {
  constructor(up, down, right, left) {
	if (up !== null) this.up = up;
	if (down !== null) this.down = down;
	if (right !== null) this.right = right;
	if (left !== null) this.left = left;
  }
  
  equal(){
	  if(this.up !== undefined && this.down !== undefined && this.right !== undefined && this.left !== undefined) {
		if (this.up === this.down && this.up == this.right && this.up === this.left) return true;
	  } 
	  
	  if(this.down !== undefined && this.right !== undefined && this.left !== undefined) {
		if (this.down == this.right && this.down === this.left) return true;
	  }
	  
	  if(this.right !== undefined && this.left !== undefined) {
		if (this.right === this.left) return true;
	  }
	  
	  if(this.up !== undefined && this.down !== undefined) {
		if (this.up === this.down) return true;
	  }
	  
	  if(this.up !== undefined && this.right !== undefined) {
		if (this.up === this.right) return true;
	  }
	  
	  if(this.up !== undefined && this.left !== undefined) {
		if (this.up === this.left) return true;
	  }
	  
	  if(this.down !== undefined && this.right !== undefined) {
		if (this.down === this.right) return true;
	  }
	  
	  if(this.down !== undefined && this.left !== undefined) {
		if (this.down === this.left) return true;
	  }
  }
  
}

var qtable = [];
var state = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570, 630, 690];
for(i=0; i<state.length; i++){
	for(j=0; j<4; j++){
		key = state[i].toString().concat(state[j].toString());
		
		qtable[key]= new Qvalue(0, 0, 0, 0);
		
		switch(state[j]) {
			case 30: // mossa up impossibile
				delete qtable[key]["up"];
				break;
			case 210: // mossa down impossibile
				 delete qtable[key]["down"]; 
				 break;
		}
		
		switch(state[i]) {
			case 30: // mossa left impossibile
				delete qtable[key]["left"];
				break;
			case 690: // mossa right impossibile
				 delete qtable[key]["right"]; 
				 break;
		}
	}
}

console.log(qtable);

indice = 1;
for(line in qtable){
	//console.log("line: " +line);
	var table = document.getElementById("qtable");

	// Create an empty <tr> element and add it to the 1st position of the table:
	var row = table.insertRow(indice);
	row.id = line;
	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell = row.insertCell(0);
	
	//alert(qtable[line][z]);
	var cell_up = row.insertCell(1);
	cell_up.id=1;
	var cell_down = row.insertCell(2);
	cell_down.id=2;
	var cell_left = row.insertCell(3);
	cell_left.id=3;
	var cell_right = row.insertCell(4);
	cell_right.id=4;
	
	if(qtable[line].up !== undefined) cell_up.innerHTML = qtable[line].up;
	if(qtable[line].down !== undefined) cell_down.innerHTML = qtable[line].down;
	if(qtable[line].right !== undefined) cell_left.innerHTML = qtable[line].right;
	if(qtable[line].left !== undefined) cell_right.innerHTML = qtable[line].left;

	cell.innerHTML = line;
	indice++;
}

function maxAction(obj){
	var highest = Number.NEGATIVE_INFINITY;;
	var max = [];
	var action;
	for (var prop in obj) {
		if(obj.hasOwnProperty( prop )) {
			//console.log(prop);
			if(obj[prop] > highest ){
				max = [];
				highest = obj[prop];
				action = prop;
				max[prop] = highest;
			}
		} 
	}
	return action + ":" + highest ;
}

function randomAction(obj){
	var randomvalue = [];
	var keys = Object.keys(obj);
    randomkey = keys[keys.length * Math.random() << 0];
	randomvalue[randomkey] = obj[randomkey];
	return randomkey + ":" + randomvalue[randomkey];
}

function chooseAction(obj, epsilon) {
	p = Math.random();
	if(p < epsilon) { return randomAction(obj); }
	else { return maxAction(obj); }
}