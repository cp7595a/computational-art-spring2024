// set variables
let yoff = 0; 
let height1 = 0;

function setup() {
  createCanvas(700, 700);
  colorMode(HSB);
}
yoff += 0;

// I used the noise() p5 reference as inpiration to make this blood drip thing

User
function draw() {
  background(255); // Redrawing the background helps for the drip effect

  let noise1 = map(mouseY, 0, height, 0.005, 0.005); // if u want to move it around?

  //yoff += 0.0009; // slow change overtime

  for (let i = 0; i <= width; i += 0.3) { // same structure as in class except incremented by 0.3 bc i++ felt too slow
    height1 += 0.001 // increment for the drip but not too fast
    let y = map(noise(i * noise1), 0, 1, 0, height1);
    stroke(16, 95, 54);
    strokeWeight(5);
    line(i, 0, i, y); 
  }

  // looked for text on the p5 reference page so that this project looked less crazy
  textSize(32);
  noStroke();
  fill(255);
  text('hi :)', 350, 350);
  
}
