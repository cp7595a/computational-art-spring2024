let dots = [];
let numDots = 10;
let snow = [];
let snowAmt = 500;

let gravitationalConstant = 0.00001;
let downwardGravity;
let wind;

function preload(){
  img1 =loadImage("images/pingu.png")
  img2 =loadImage("images/cake.png")
  img3 =loadImage("images/igloo.gif")
  img4 =loadImage("images/hat.png")
}
function setup() { 
    createCanvas(600, 400);
    colorMode(HSB);
    background(360 * .6, 60, 100, 0.03);
    
    downwardGravity = createVector(0, 0.38);
    wind = createVector(-1, 0);
  
  // Create all the snow
  for (let i = 0; i < snowAmt; i++) {
    let x = map(random(i), 0, snowAmt, 0, 800);
    let y = random(15);
    snow.push(new Snow(x, y, i + 1));
  }

  sun = new Sun(width / 2, height / 2, 25);
} 

function draw() { 
    push();
         noStroke();
         fill(360 * .6, 60, 100);
         rect(0, 0, width, height);
    pop();


    for (let flake of snow) {
        flake.update();
        flake.show();
      }

    for (let dot of dots) {
        dot.update();
        dot.show();
    }

    sun.update();
    sun.show();


    

    push();
    noStroke();
    fill(90);
    rect(0, 300, width, height);
    pop();

    push();
    noStroke();
    translate(width/2, height/2);
    image(img1, -10 , 10, 175, 100);
    image(img2, 125 , 40, 85, 85);
    image(img3, -225 , -20, 225, 175);
    image(img4, 60 , -10, 35, 35);
    pop();


}


function explode(x, y) {
    for (let i = 0; i < 15; i++) {
        dots.push(new dotEx(x, y, i+1, 10));
    }
}

function mousePressed() { //searched this up on p5 reference
    explode(mouseX, mouseY);
}
