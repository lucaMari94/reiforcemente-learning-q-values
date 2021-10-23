function Robot(x, y){
	this.x = x;
	this.y = y;
	
	this.display = function(){
		ellipse(this.x, this.y, 40, 40);
	}
	
	this.moveUp = function(){
		if(this.y >= 60 && this.y <= 210) this.y = this.y - 60;
	}
	
	this.moveDown = function(){
		if(this.y >= 0 && this.y < 210) this.y = this.y + 60;
	}
	
	this.moveRight = function(){
		if(this.x >= 0 && this.x < 690) this.x = this.x + 60;
	}
	
	this.moveLeft = function(){
		if(this.x >= 60 && this.x <= 690) this.x = this.x - 60;
	}
}