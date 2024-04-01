let count = 0;
let rotationSlider;
let colorSlider;
let pulsingSlider;
let movingSlider;
let diameterSlider; // Declare the diameter slider variable

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  background(0, 0, 100);
  noFill();
  stroke(0, 0, 100);

  rotationSlider = createSlider(0, 0.02, 0.005, 0.001);
  rotationSlider.position(10, height + 10);

  colorSlider = createSlider(0, 360, 0, 1);
  colorSlider.position(10, height + 40);

  pulsingSlider = createSlider(0, 1, 0.01, 0.001);
  pulsingSlider.position(10, height + 70);

  movingSlider = createSlider(0, 1, 0.01, 0.001);
  movingSlider.position(10, height + 100);

  diameterSlider = createSlider(400, 800, 100, 1); 
  diameterSlider.position(10, height + 130);
}

function draw() {
  background(0, 0, 100, 0.06);

  count = 0;

  push();
  translate(width / 2, height / 2);
  scale(noise(frameCount * 0.01) + 1); 
  
  rotate(frameCount * rotationSlider.value());
  
  for (let i = 0; i < 6; i++) {
    drawCircles(0, 0, diameterSlider.value()); // Pass the diameter slider value
    rotate(PI / 2);
  }

  pop();
}

