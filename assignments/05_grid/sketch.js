let numCellsW = 13;
let numCellsH = 13;
let cellWidth;
let cellHeight;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  noLoop();

  cellWidth = width / numCellsW;
  cellHeight = height / numCellsH;
}

function draw() {


  background(0, 0, 100);
  drawGrid();
  
  // liked the look of a border line (makes it look like the fram where the values are actually extreme and have different colors than the rest)
  noFill();
  strokeWeight(20);
  stroke(0, 0, 70);
  rect(0, 0, width, height);



}
function drawGrid() {
  blendMode(DIFFERENCE); // out of for loop to help possible freezing? idk I was having some trouble
  // subtract colors from underlying image
  for (let xIndex = 0; xIndex < numCellsW; xIndex++) {
    for (let yIndex = 0; yIndex < numCellsH; yIndex++) {
      let x = cellWidth * xIndex;
      let y = cellHeight * yIndex;

      push();

      translate(x, y);

      let xNew = cellWidth/2; // made it more kaleidoscope-y by divding the cell width value by 2 and it seems to horozontally
      //configure the shapes when drawn

      // USING SIN and NOISE FOR THE VISUAL EFFECTS
      let hue = map(noise(sin(x * frameCount), y * frameCount), 0, 1, 0 , 100); // the sin function makes almost like rows of the similar colors
      // mapping so that the colors can vary while also being close to one another (sin only would outout red shapes)
      let size = map(sin(noise(x * 0.01, y * 0.01, frameCount * 0.05)), -1, 1, 5, 100); // sin function for size but 
      // trying to make the variations of size look fluid (kaledescope kind of effect)

      // experimenting with the 100 value in the second sin function to create the different shape sizes and
      // how extreme the values get around the border (also a result )
    

      // drawing circles and triangles and changing size based on sin and also making use sin and noise based
      // this alters the state of overlapping shapes and although they are similar to those next to them,
      // there are so many and layers that create this visual
      strokeWeight(0.4); 
      fill(hue, 90, random(70, 100));
      ellipse(xNew, cellHeight, size, size * 2);
      triangle(xNew * 2, cellHeight - size /2 , xNew - size, cellHeight + size, xNew+ size, cellHeight + size);
      ellipse(xNew - 15, cellHeight + 5, size, size);
      ellipse(xNew - 25, cellHeight - 5, size, size);
      
      pop();
    }
  }
}
