var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;
ctx.setTransform(3,0,0,3,0,0);

var mouse = {
  x: undefined,
  y: undefined
}

//Animations
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})



//Cannon object
//_______________________________________
function Cannon(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.lastMouse = {x: x, y: y};

  //Code that continuously turns the object by a speed: velocity
  //this.angle = 0;
  //this.velocity = .01;

  this.update = function(){
    ctx.setTransform(3,0,0,3,0,0);

    // const lastPoint = {x: this.x, y: this.y};

    //drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * .05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * .05;

    //Allows for rotation of the cannon based on mouses position
    ctx.translate(this.x, this.y + this.height/3);
    ctx.rotate(Math.atan2((mouse.x/3 - this.x), - (mouse.y/3 - this.y)));
    ctx.translate(-(this.x), -(this.y + this.height/3));

    //redraws the object
    this.draw();
  }

  //draws a simple rectangle barrel and base rotating about the base
  this.draw = function() {

    //Base of cannon
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.height/3, 5, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    //cannon barrel
    ctx.beginPath();
    ctx.fillRect(this.x - (this.width/2),this.y - (this.height),this.width,this.height);
    ctx.closePath();

  }
}

//Projectile object
//_______________________________________
function Projectile(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.lastMouse = {x: x, y: y};

  this.update = function(){
    ctx.setTransform(3,0,0,3,0,0);

    //changes context rotation to target location
    ctx.rotate(Math.atan2((mouse.x/3 - this.x), - (mouse.y/3 - this.y)));
    //ctx.translate(this.x + , this.y + )
    //redraws the object
    this.draw();
  }

  //draws a simple projectile
  this.draw = function() {

    //round projectile
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.height/3, 5, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

  }
}

var cannonLeft;
var cannonCenter;
var cannonRight
//initializes cannon array
function init(){

    var width = 3;
    var height = 10;
    var x = (canvas.width/2)/3;
    var y = (canvas.height)/3 - height * 2/6;

    cannonLeft = new Cannon(x-(x/1.2), y, width, height);
    cannonCenter = new Cannon(x, y, width, height);
    cannonRight = new Cannon(x+(x/1.2), y, width, height);
}

function animate(){
  requestAnimationFrame(animate);

  //Clear screen
  ctx.setTransform(3, 0, 0, 3, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //animate cannons
  cannonLeft.update();
  cannonCenter.update();
  cannonRight.update();

  //check inputs
  //getInput();
}

init();
animate();
