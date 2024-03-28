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

  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    flowField[xIndex] = [];
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      let angle = 4 * PI;
      flowField[xIndex][yIndex] = new Cell(angle, xIndex, yIndex);
    }
  }
  
  puffer = new Crab(random(200, 700), 425)

  target = puffer.pos

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

  //SAN

  fill(197, 72, 70, 0.9);
  rect(0, 500, width, height/6);
  fill(34, 35, 91, 0.9);
  rect(0, 450, width, 500);

  //ANIMALS AND BUBBLES
  puffer.update();
  puffer.show();

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
