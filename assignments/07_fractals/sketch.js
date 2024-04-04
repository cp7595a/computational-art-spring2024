let count = 0;
let rotationSlider;
let pulsingSlider;
let diameterSlider;

function setup() {
  createCanvas(700, 500);
  colorMode(HSB);
  background(0, 0, 100);
  noFill();
  stroke(0, 0, 100);

  rotationSlider = createSlider(0, 0.05, 0.01, 0.001);
  rotationSlider.position(10, height + 10);

  colorSlider = createSlider(0, 1.25, 0.1, 0.001);
  colorSlider.position(10, height + 35);

  diameterSlider = createSlider(10, 600, 450); 
  diameterSlider.position(10, height + 60);

  translateSlider = createSlider(0, 900, 900); 
  translateSlider.position(10, height + 85);

}

function draw() {
  background(0, 0, 100, 0.06);

  count = 0;

  push();
  translate(width / 2, height / 2);
  scale(noise(frameCount * 0.01) + 1); 
  
  rotate(frameCount * rotationSlider.value());

  // I really liked the translate idea, so i used to kind of create a double illusion
  translate(-translateSlider.value(), 0); 

  
  for (let i = 0; i < 8; i++) {
    drawCircles(0, 0, diameterSlider.value());
    rotate(PI / 2);
  }

  pop();
}

