let dots = [];
let numDots = 10;
let snow = [];
let snowAmt = 250;

let gravitationalConstant = 0.00001;
let downwardGravity;
let wind;

// images
function preload(){
  img1 =loadImage("images/pingu.png")
  img2 =loadImage("images/cake.png")
  img3 =loadImage("images/igloo.gif")
  img4 =loadImage("images/hat.png")
  img5 = loadImage("images/star.png")

}
function setup() { 
    createCanvas(600, 400);
    colorMode(HSB);
    background(100);
    
    downwardGravity = createVector(0, 0.38);
    wind = createVector(-0.01, 0);
  
  // Create the snow
  for (let i = 0; i < snowAmt; i++) {
    let x = map(random(i), 0, snowAmt, 0, 800);
    let y = random(15);
    snow.push(new Snow(x, y, i + 1));
  }
  
  // create the singular sun
  sun = new Sun(width / 2, height / 2, 25);
} 

function draw() { 
    push();
         noStroke();
         fill(197, 43, 100);
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

    // non class stuff
    
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
    image(img5, 60 , -100, 35, 35);
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