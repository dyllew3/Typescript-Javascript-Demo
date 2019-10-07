var c;
var ctx;
var circles = [];
var context;
var xPos = [];
var yPos = [];

function CreateCircles(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = Math.random() * 2;
    this.dy = Math.random() * 2;

};

function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#FF0000";
    var red  = Math.round(  Math.random() * 255);
    var green  = Math.round(  Math.random() * 255);
    var blue  = Math.round(  Math.random() * 255);
    document.getElementById("balls").style.color = "rgb(" + red + ", "       + green + " ,  " + blue + ")"; 
    for(var i = 0 ; i < circles.length; i++){
    ctx.beginPath();	
    ctx.arc(circles[i].x, circles[i].y, circles[i].r,0, 2 * Math.PI);
    moveCircles(circles[i], i);
    ctx.fill();


}
    ctx.closePath();
};

function begin(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    createRandomCircles(12,20);
    setInterval(draw, 1000/60);
        

};

function moveCircles(shape, index){
    for(var i = 0; i < circles.length; i++){
        if(i != index && (isColliding(shape, circles[i]))){
            collision(shape, circles[i]);
        }
    }
    if((shape.x + shape.r) >= c.width){
        shape.x = c.width -shape.r;
        shape.dx  = -shape.dx;

    }
    else if(shape.x<= shape.r){
        shape.x = shape.r;
        shape.dx = -shape.dx;
    }
    
    if(shape.y + shape.r >= c.height ){
        shape.y = c.height - shape.r;
        shape.dy = -shape.dy;	
    }
    else if(shape.y <= shape.r ){
        shape.y = shape.r;
        shape.dy = -shape.dy;
    }
    shape.x += shape.dx;
    shape.y += shape.dy;
};

function createRandomCircles(amount, r){
    for(var i = 0; i < amount; i++){
        var x = ((c.width-r) * Math.random());
        var y = ((c.height - r) * Math.random());
        while(isUsed(x,y,r)){
            x = ((c.width-r) * Math.random());
            y = ((c.height - r) * Math.random());
        }
        xPos.push(x);
        yPos.push(y);	
        circles.push(new CreateCircles(x, y, r));
    }	
};

function isUsed(x, y, r){
    if(xPos != null && yPos != null){
        if(x <= r || x >= (c.width - r) || y >= (c.height - r) || y <= r ){		return true;		
        }
        for (var i = 0; i < xPos.length ; i++){
            var netX = x - xPos[i];
            var netY = y - yPos[i];
            var distance = (netX * netX) + (netY * netY);
            var twoRad = (r * 2);
            if(distance <= twoRad){
                return true;
            }
            
        }
        return false;
    }
    else{
        return false;
    }

};

function isColliding(circleOne, circleTwo){
    var netX = circleTwo.x - circleOne.x;
    var netY = circleTwo.y - circleOne.y;
    var squareRadius = circleOne.r + circleTwo.r;
    var distance = (netX * netX) + (netY * netY);
    if(distance <= (squareRadius * squareRadius)){
        return true;
    }
    else {
        return false;
    }

};

function collision(circleOne, circleTwo){
    var normal = new Vector ((circleTwo.x - circleOne.x), (circleTwo.y -     	circleOne.y));
    var d = normal.magnitude;
    if(d == 0){
        d = 1;
    }
    var transdist = normal.multiply(((circleOne.r + circleTwo.r)-d)/d);
    var circleVector1 = new Vector(circleOne.x, circleOne.y);
    var circleVector2 = new Vector(circleTwo.x, circleTwo.y);
    circleVector1 = circleVector1.subtract(transdist.multiply(0.5));
    circleVector2 = circleVector2.add(transdist.multiply(0.5));
    circleOne.x = circleVector1.x;
    circleOne.y = circleVector1.y;
    circleTwo.x = circleVector2.x;
    circleTwo.y = circleVector2.y;
    
    var newNormal = normal.divide(normal.magnitude);
    var a = new Vector (circleOne.dx, circleOne.dy);
    var b = new Vector(circleTwo.dx, circleTwo.dy);
    var aInit= a.dot(newNormal);	
    var bInit= b.dot(newNormal);	
    var aFin = bInit;
    var bFin = aInit;
    a = a.add(newNormal.multiply(aFin- aInit));
    b = b.add(newNormal.multiply(bFin- bInit));
    circleOne.dx = a.x;
    circleOne.dy = a.y;
    circleTwo.dx = b.x;
    circleTwo.dy = b.y;
}

function Vector(pointX, pointY){
    this.x = pointX;
    this.y = pointY;
    this.magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));
    this.add = function(vector){
        var newX = vector.x + this.x;
        var newY = vector.y + this.y;
        return (new Vector(newX, newY));
    };
    this.dot = function(vector){
        var a = this.x * vector.x;
        var b = this.y * vector.y;
        return (a + b);
    };
    this.distance = function(vector){
        var xDist = vector.x - this.x;
        var yDist = vector.y - this.y;
        return (Math.sqrt((xDist * xDist) + (yDist * yDist)));
    
    };
    this.subtract = function(vector){
        var diffX = (this.x - vector.x);
        var diffY = (this.y - vector.y);
        return (new Vector(diffX, diffY));		
        
    };
    this.multiply = function(scaleFactor){
        var diffX = (this.x * scaleFactor);
        var diffY = (this.y * scaleFactor);
        return (new Vector(diffX, diffY));
        
    };
    this.divide = function(scaleFactor){
        var diffX = (this.x/scaleFactor);
        var diffY = (this.y/scaleFactor);
        return (new Vector(diffX, diffY));
        
        
    };
    
    
        
    
};
function reset(){

    location.reload();

};