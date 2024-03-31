let systems = [];
let puffers = [];
let flowField = [];
let fishes = [];

let numFishes = 25;
let numSystems = 10; 
let numCellsWidth = 20;
let numCellsHeight = 20;
let numPuffers = 1;


let cellWidth;
let cellHeight;
let gravity;

function setup() {
  createCanvas(1200, 600);

  colorMode(HSB);
  noStroke();

  cellWidth = width / numCellsWidth;
  cellHeight = height / numCellsHeight;

  let xoff = 0;
  let yoff = 0;
  let inc = 0.05;
  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    flowField[xIndex] = [];
    yoff = 0;
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      let angle = map(noise(xoff. yoff), 0, 1, 350 * PI/180, 2 * PI);
      flowField[xIndex][yIndex] = new Cell(angle, xIndex, yIndex);
    }
    yoff += inc;
    xoff += inc;
  }
  
  crab = new Crab(random(200, 700), 425)

  target = crab.pos

  for(let i = 0; i < numFishes; i++) {
    fishes.push(new Fish(random(width), random(height), target));
  }


  gravity  = createVector(0, -0.1)
  for (let i = 0; i < numSystems; i++) {
    systems.push(new ParticleSystem(random(100, width-200), 600, gravity));
  }

}

function draw() {
  background(0, 0, 100);

  //OCEAN
  fill(0);
  rect(0, 500, width/2, height/6);

  push();
  fill(191, 77, 81, 0.8);
  rect(0, 0, width, height);

  pop();

  //Little shiny glimmers
  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      flowField[xIndex][yIndex].update();
      flowField[xIndex][yIndex].show();
    }
  }

  //SAND

  fill(197, 72, 70, 0.9);
  rect(0, 500, width, height/6);
  fill(34, 35, 91, 0.9);
  rect(0, 450, width, 500);

  //ANIMALS AND BUBBLES
  crab.update();
  crab.show();

  for (let fish of fishes) {
    fish.update();
    fish.show();
  }


  for (let ps of systems) {
    ps.update();
  }
  
}

function positionToFlowFieldIndex(x, y) {
  let xIndex = floor(map(x, 0, width, 0, numCellsWidth));
  xIndex = constrain(xIndex, 0, numCellsWidth-1);
  let yIndex = floor(map(y, 0, height, 0, numCellsHeight));
  yIndex = constrain(yIndex, 0, numCellsHeight-1);
  return createVector(xIndex, yIndex);
}
