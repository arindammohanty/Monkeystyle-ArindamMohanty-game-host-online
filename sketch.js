
var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var backgroundy, backgroundImage;
  var score= 0;
  var ground;
  var gamestate = 1;
  var reset,reset1;

function preload(){
   
    backgroundImage= loadImage("jungle.jpg");

  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
    bananaImage= loadImage("banana.png");
    obstacleImage= loadImage("stone.png");
  
    reset1 = loadImage("RESET.png")
}

function setup() {
 
    createCanvas(400,400);
  
    backgroundy = createSprite (200,200,10,10);
    backgroundy.addImage ("backgroundimage", backgroundImage);
    backgroundy.velocityX= -2;
    
    monkey = createSprite(50,340,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
  
    reset = createSprite(200,200,10,10);
    reset.addImage("reset3",reset1);
    reset.scale = 0.5;

    ground= createSprite (0,390,800,10);
    ground.visible= false;
  
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
    background("white");
    console.log(monkey.x);
  
    if (backgroundy.x<150) {
      backgroundy.x= 200
    }   
   
    if(gamestate == 1){
      reset.visible = false;
    }
  
    if(gamestate == 0){
      fill("red");
    text("You loose.",300,100);
    reset.visible = true;
      if(mousePressedOver(reset)) {
      reset2();
      }
    }
  
  
    if (keyDown ("space") && monkey.x>=20) {
      monkey.velocityY= -20;  
    }    
    monkey.velocityY= monkey.velocityY + 0.8;
    monkey.collide (ground);
  
    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
    }
  
    if(score == 50){
      gamestate = 2;
      text.scale = 20;
    }
  
    switch (score) {
      case 0:monkey.scale = 0.1;
      break;
      case 10: monkey.scale= 0.15;
      break;
      case 20: monkey.scale= 0.20;
      break;
      case 30: monkey.scale= 0.25;
      break;
      case 40: monkey.scale= 0.30;
      break;
      case 50: monkey.scale= 0.35;
      break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey) && gamestate == 1 ) {
      score= 0;
      obstacleGroup.destroyEach();
      monkey.scale= 0.1;
      gamestate = 0;
    }
    spawnBananas();
    spawnObstacles();
  
    drawSprites();
    stroke ("white");
    textSize (15);
    text ("Score: "+score,190,70);
  
    if(gamestate ==2){
    fill("green");
    textSize(20);
      text("you win",160,170);
    
    reset.visible = true;
    if(mousePressedOver(reset)) {
    reset2();
    }
 }
  
}

//function for bananas
function spawnBananas () {
  if (frameCount%90===0 && gamestate == 1) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
      banana.lifetime= 150;
      bananaGroup.add(banana);
  }
}

//function for obstacles
function spawnObstacles () {
  if (frameCount%300===0 && gamestate == 1) {
    obstacle= createSprite (270,370,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.05;
    obstacle.velocityX= -4;
      obstacleGroup.add(obstacle);
  }
}
function reset2(){
  gamestate = 1;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score =0;

}
