var dog, dogImg, happyDog, foodS, database, foodStock;

function preload(){

  dogImg = loadImage("dogImg.png")
	happyDog = loadImage("dogImg1.png")
}

function setup() {
  database = firebase.database()
  createCanvas(700, 650);
  
  dog = createSprite(350,350,20,20)
  dog.addImage(dogImg)
  dog.scale = 0.25

  foodStock = database.ref('food')
  foodStock.on("value", readStock)
  
}


function draw() {  
  background('#007C7F') ;

  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
    dog.addImage(happyDog)
  }

  drawSprites();
  
  fill("red")
  textSize(30)
  text("Food Left: " + foodS, 260,550)

  fill("red")
  textSize(30)
  text("Press the Up Arrow", 220,40)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  } else{
    x = x-1;
  }

  database.ref('/').update({
    food : x
  })
}