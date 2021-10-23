function EmptyPosition(x, y){
	this.x = x;
	this.y = y;
	
	this.display = function(){
		// let c = color(255, 255, 0);
		// fill(c);
		// noStroke();
		rect(this.x-20, this.y-40, 60, 60);
	}
	
	this.moveUp = function(){
		if(this.y > 40 && this.y <= 220) this.y = this.y - 60;
	}
	
	this.moveDown = function(){
		if(this.y >= 0 && this.y < 220) this.y = this.y + 60;
	}
	
	this.moveRight = function(){
		if(this.x >= 0 && this.x < 200) this.x = this.x + 60;
	}
	
	this.moveLeft = function(){
		if(this.x > 20 && this.x <= 220) this.x = this.x - 60;
	}
}