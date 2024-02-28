let numCellsWidth = 15;
let numCellsHeight = 15;
let cellWidth;
let cellHeight;
let xOff = 0;
let yOff = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  noLoop();

  cellWidth = width / numCellsWidth;
  cellHeight = height / numCellsHeight;
}

function draw() {

  background(0, 0, 100);
  drawGrid();

  xOff += 0.01;
  yOff += 0.01;

}

function drawGrid() {
  blendMode(DIFFERENCE);

  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      let x = cellWidth * xIndex;
      let y = cellHeight * yIndex;

      push();

      translate(x, y);

      let xNormal = cellWidth / 2;
      let yNormal = cellHeight / 2;
      
      let flowerSize = map(noise(x * 0.01 + xOff, y * 0.01 + yOff, frameCount * 0.05), 0, 1, 5, 120);
      let flowerHue = (noise(x * 0.01 + xOff, y * 0.01 + yOff) * 1.5) * 360;// Using 2D Perlin noise for hue

      strokeWeight(0.4); 
      fill(flowerHue, 90, 100);
      ellipse(xNormal, yNormal, flowerSize, flowerSize * 2);
      triangle(xNormal, yNormal - flowerSize / 2, xNormal - flowerSize, yNormal + flowerSize, xNormal + flowerSize, yNormal + flowerSize);
      ellipse(xNormal- 15, yNormal + 5, flowerSize);
      ellipse(xNormal- 25, yNormal - 5, flowerSize);
      
      pop();

    }
  }
}
