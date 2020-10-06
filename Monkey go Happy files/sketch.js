//calling variables
  var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var background1, background2, backgroundImage;
  var score= 0;
  var ground;

function preload(){
  //loading image for background  
    backgroundImage= loadImage("jungle.jpg");
  
  //loading animation for monkey
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  //loading images for banana and obstacles
    bananaImage= loadImage("banana.png");
    obstacleImage= loadImage("stone.png");
}

function setup() {
  //creating canvas  
    createCanvas(windowWidth, windowHeight);
  
  //creating background sprite
    background1= createSprite (windowWidth/2,windowHeight/2);
    background1.addImage ("backgroundimage", backgroundImage);
    background1.velocityX= -2;
    background2= createSprite (windowWidth*2,windowHeight/2);
    background2.addImage ("backgroundimage", backgroundImage);
    background2.velocityX= -2;
    
  //creating monkey sprite
    monkey= createSprite (windowWidth/8,windowHeight/2+300,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
  
  //creating ground sprite
    ground= createSprite (windowWidth/8,windowHeight/2+300,800,10);
    ground.visible= false;
  
  //creating groups for banana and obstacles
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
  //assigning background color
    background("white");
  
  //to know the position of monkey to make more changes
    console.log(monkey.x);
  
  //reseting background
    if (background1.x<windowWidth/8) {
      background1.x= windowWidth/2;
    } 
    if (background2.x<windowWidth/2) {
      background2.x= windowWidth;
    }
  
  //making the monkey jump  
    if (touches.length > 0 ||keyDown ("space") && monkey.x>=50) {
      monkey.velocityY= -20;  
      touches = [];
    }    
    
  //adding gravity to monkey
    monkey.velocityY= monkey.velocityY + 0.8;
  
  //preventing the monkey from falling off the ground
    monkey.collide (ground);
  
  //scoring system and changing size of the monkey
    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
    }
  
    switch (score) {
      case 0: monkey.scale= 0.15;
      break;
      case 10: monkey.scale= 0.20;
      break;
      case 20: monkey.scale= 0.25;
      break;
      case 30: monkey.scale= 0.30;
      break;
      case 40: monkey.scale= 0.35;
      break;
      case 50: monkey.scale= 0.40;
      break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      score= 0;
      obstacleGroup.destroyEach();
      monkey.scale= 0.1;
    }
  
   
  //calling user-defined functions
    spawnBananas();
    spawnObstacles();
  
  //drawing sprites
    drawSprites();
  
  //displaying score
    stroke ("white");
    textSize (15);
    text ("Score: "+score,windowWidth/2-30,70);  
}

//function for bananas
function spawnBananas () {
  if (frameCount%180===0) {
    banana= createSprite (windowWidth,windowHeight/2,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.10;
    banana.velocityX= -3;
    
    //adding lifetime to bananas
      banana.lifetime= windowWidth;
    
    //adding banana to banana group
      bananaGroup.add(banana);
  }
}

//function for obstacles
function spawnObstacles () {
  if (frameCount%300===0) {
    obstacle= createSprite(windowWidth,windowHeight/2+300,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.15;
    obstacle.velocityX= -4;
    
    //adding obstacle to obstacle group
      obstacleGroup.add(obstacle);
  }
}