interface Point {
    x: number;
    y: number;
}

class Cirle implements Point {
    x: number;
    y: number;
    radius: number

    private xSpeed: number;
    private ySpeed: number;

    constructor(x: number, y: number, radius: number, xSpeed: number = 0,
                ySpeed:number = 0){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    public getXpos(): number {
        return this.x;
    }

    public getYpos(): number {
        return this.y;
    }

    public getXSpeed(): number {
        return this.xSpeed;
    }

    public getYSpeed(): number {
        return this.ySpeed;
    }


    public setXSpeed(newSpeed: number): void {
        this.xSpeed = newSpeed;
    }

    public setYSpeed(newSpeed: number): void {
        this.ySpeed = newSpeed;
    }
}


// Make an instance of circle class
function MakeCircle(x, y, radius): Cirle {
    let ySpeed: number = Math.random() * 2;
    let xSpeed: number = Math.random() * 2;
    return new Cirle(x, y, radius, xSpeed, ySpeed);
}

let canvas;
var ctx;
let circles = [];
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    createRandomCircles(12,20);
    setInterval(draw, 1000/60);
        

};

function moveCircles(shape, index: number){
    for(var i = 0; i < circles.length; i++){
        if(i != index && (isColliding(shape, circles[i]))){
            collision(shape, circles[i]);
        }
    }
    if((shape.x + shape.r) >= canvas.width){
        shape.x = canvas.width -shape.r;
        shape.dx  = -shape.dx;

    }
    else if(shape.x<= shape.r){
        shape.x = shape.r;
        shape.dx = -shape.dx;
    }
    
    if(shape.y + shape.r >= canvas.height ){
        shape.y = canvas.height - shape.r;
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
        var x = ((canvas.width-r) * Math.random());
        var y = ((canvas.height - r) * Math.random());
        while(isUsed(x,y,r)){
            x = ((canvas.width-r) * Math.random());
            y = ((canvas.height - r) * Math.random());
        }
        xPos.push(x);
        yPos.push(y);	
        circles.push(new CreateCircles(x, y, r));
    }	
};

// Makes sure circles are not spawned on each other at beginning
function isUsed(x, y, r){
    if(xPos != null && yPos != null){
        if(x <= r || x >= (canvas.width - r) || y >= (canvas.height - r) || y <= r ){		return true;		
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


// Checks if two circles are colliding
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


// Maths function which calculates
// the resultant velocities of the two spheres
// colliding and changes their xSpeed and ySpeed
function collision(circleOne, circleTwo){
    var normal = new Vector ((circleTwo.x - circleOne.x), (circleTwo.y - circleOne.y));
    var d = normal.magnitude();
    if(d == 0){
        d = 1;
    }

    // Move the circles back so they are no longer colliding
    let transdist: Vector = normal.multiply(((circleOne.r + circleTwo.r)-d)/d);
    let circleVector1 = new Vector(circleOne.x, circleOne.y);
    let circleVector2 = new Vector(circleTwo.x, circleTwo.y);

    circleVector1 = circleVector1.subtract(transdist.multiply(0.5));
    circleVector2 = circleVector2.add(transdist.multiply(0.5));
    
    circleOne.x = circleVector1.x;
    circleOne.y = circleVector1.y;
    circleTwo.x = circleVector2.x;
    circleTwo.y = circleVector2.y;
    
    // Create new normal
    let newNormal: Vector = normal.divide(normal.magnitude());
    
    let circleOneSpeed: Vector = new Vector (circleOne.dx, circleOne.dy);
    let circleTwoSpeed: Vector = new Vector(circleTwo.dx, circleTwo.dy);

    let aInit: number = circleOneSpeed.dotProduct(newNormal);	
    let bInit: number = circleTwoSpeed.dotProduct(newNormal);	
    
    let aFin = bInit;
    let bFin = aInit;
    
    circleOneSpeed = circleOneSpeed.add(newNormal.multiply(aFin- aInit));
    circleTwoSpeed = circleTwoSpeed.add(newNormal.multiply(bFin- bInit));
    circleOne.dx = circleOneSpeed.x;
    circleOne.dy = circleOneSpeed.y;
    circleTwo.dx = circleTwoSpeed.x;
    circleTwo.dy = circleTwoSpeed.y;
}


// Vector class
class Vector implements Point {
    constructor(public x: number,  public y: number)
    {}

    /**
     * magnitude
     */
    public magnitude(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y))
    }

    /**
     * add
     */
    public add(vector: Vector): Vector {
        let newX = vector.x + this.x;
        let newY = vector.y + this.y;
        return (new Vector(newX, newY));
    }


    /**
     * dotProduct between 2 vectors
     */
    public dotProduct(vector: Vector): number {
        let a = this.x * vector.x;
        let b = this.y * vector.y;
        return (a + b);
    }


    /**
     * distance
     */
    public distance(vector: Vector) : number {
        let xDist = vector.x - this.x;
        let yDist = vector.y - this.y;
        return (Math.sqrt((xDist * xDist) + (yDist * yDist)));  
    }


    /**
     * subtract
     */
    public subtract(vector: Vector): Vector {
        let diffX = (this.x - vector.x);
        let diffY = (this.y - vector.y);
        return (new Vector(diffX, diffY));	
    }


    /**
     * multiply vector by scale factor
     */
    public multiply(scaleFactor: number): Vector {
        let diffX = (this.x * scaleFactor);
        let diffY = (this.y * scaleFactor);
        return (new Vector(diffX, diffY));        
    }


    /**
     * divide vector by a scale factor
     */
    public divide(scaleFactor: number): Vector {
        let diffX = (this.x/scaleFactor);
        let diffY = (this.y/scaleFactor);
        return (new Vector(diffX, diffY));
    }
}



function reset(){

    location.reload();

};