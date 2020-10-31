var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleblock,invisibleblockGroup;
var gameState="play";
var spookysound;

function preload(){
towerImg = loadImage("tower.png");
  doorImg= loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png","ghost-jumping.png");
  spookysound=loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleblockGroup = new Group();
}

function draw(){
background(0);
  
  if (gameState === "play"){
 spookysound.play();
    
  if (tower.y>500){
tower.y = 300;
}
  
  if (keyDown("space")){
  ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if (keyDown("left_arrow")){
  ghost.x = ghost.x-3;
  }
  
  if (keyDown("right_arrow")){
  ghost.x = ghost.x+3;
  }
  
  if (climbersGroup.isTouching(ghost)){
  ghost.velocityY=0;
    
  }
  
  if (invisibleblockGroup.isTouching(ghost)){
  ghost.destroy();
  gameState="end";
  }
  
  
  spawnDoors();
    drawSprites();
  }
  
  if (gameState === "end"){ 
stroke("yellow");
  fill("yelllow");
  textSize(40);
  text("GAME OVER",300,300);
}

  
  

}


function spawnDoors(){
if (frameCount % 240 === 0){
var door = createSprite(200,50);
  door.addImage(doorImg);
  door.velocityY=1;
door.x=Math.round(random(120,490));
  door.lifetime=600;
  doorsGroup.add(door);
  door.depth = ghost.depth;
  ghost.depth = ghost.depth+1;
  
  var climber = createSprite(200,110);
  climber.addImage(climberImg);
  climber.x = door.x;
  climber.velocityY=1;
  climber.lifetime=600;
  climbersGroup.add(climber);
  
  var invisibleblock = createSprite(200,115);
  invisibleblock.width = climber.width;
  invisibleblock.height = 2;
  invisibleblock.x = door.x;
  invisibleblock.velocityY=1;
  invisibleblock.debug = false;
  invisibleblock.visible= false;
  invisibleblockGroup.add(invisibleblock);
  
  
}
}