let count = 0;
let rotationSlider;
let pulsingSlider;
let diameterSlider;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  background(0, 0, 100);
  noFill();
  stroke(0, 0, 100);

  rotationSlider = createSlider(0, 0.1, 0.01, 0.001);
  rotationSlider.position(10, height + 10);

  pulsingSlider = createSlider(0, 1.25, 0.1, 0.001);
  pulsingSlider.position(10, height + 35);

  diameterSlider = createSlider(10, 1000, 800); 
  diameterSlider.position(10, height + 60);
}

function draw() {
  background(0, 0, 100, 0.06);

  count = 0;

  push();
  translate(width / 2, height / 2);
  scale(noise(frameCount * 0.01) + 1); 
  
  rotate(frameCount * rotationSlider.value());

  
  for (let i = 0; i < 8; i++) {
    drawCircles(0, 0, diameterSlider.value());
    rotate(PI / 2);
  }

  pop();
}

