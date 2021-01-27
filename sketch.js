var engine, world;
var backgroundImg;
var balloon,balloonImg; 

function preload() {
  backgroundImg=loadImage("Hot Air Ballon-01.png");
  balloonImg=loadImage("Hot Air Ballon-02.png");
}

function setup() {
  database=firebase.database();
  createCanvas(800,500);
  balloon=createSprite(400,250,50,50)
  balloon.addImage(balloonImg);

  var balloonPosition = database.ref("balloon/position")
  balloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(backgroundImg); 
  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
}
drawSprites();
}



function readPosition(data){
  position=data.val()
  balloon.x=position.x;
  balloon.y=position.y;
}

function writePosition(x,y){

  database.ref("balloon/position").set({
    "x" : position.x+x,
    "y" : position.y+y 
  })
}

function showError(){
  console.log("error in writing to the database")
}