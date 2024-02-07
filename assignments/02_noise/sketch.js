let yoff = 0;
let height1 = 0;

function setup() {
  createCanvas(700, 700);
  colorMode(HSB);
}
yoff += 0;

function draw() {
  background(255); // Redrawing the background helps for the drip effect

  let noise1 = map(mouseY, 0, height, 0.005, 0.005); // Adjusting the noise mapping based on mouseY

  yoff += 0.0008;

  // Draw the dripping lines.
  for (let x = 0; x <= width; x += 0.3) {
    height1 += 0.001
    let y = map(noise(x * noise1, yoff), 0, 1, 0, height1); // Use maxHeight as the upper limit
    stroke(16, 95, 54);
    strokeWeight(10);
    line(x, 0, x, y);
  
  }

  textSize(32);
  noStroke();
  fill(255);
  text('hi :)', 350, 350);
  
}
