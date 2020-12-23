var dog,dogImg,happyDog;
var database;
var foodStock,foodS;
var score;
var foodremaining;

function preload(){
  dogImg=loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  
}

function setup() {
	createCanvas(700, 600);
  
 
  dog = createSprite(250,450,20,20);
  dog.addImage(dogImg);
  dog.scale=0.35;

  database = firebase.database();

  foodStock = database.ref('Food1');
  foodStock.on("value",readStock);

}


function draw() {  
rectMode(CENTER);
background("green");

if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
}

drawSprites();
  //add styles here
  fill("black");
  textSize(30)
  text("Press up arrow to feed milk to the dog",100,100);

  textSize(25);
  text("Food Remaining:"+ score,200,200);

}

function readStock(data){
  foodS = data.val();
  score = foodS;
}

function writeStock(x){
    if(x<=0){
        x=0
    }
    else{
      x=x-1;
    }

    database.ref('/').update({
      Food1:x

    })
}
