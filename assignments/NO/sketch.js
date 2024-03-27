let systems = [];
let sharks = [];
let flowField = [];
let vehicles = [];

let numVehicles = 12;
let numSystems = 10; 
let numCellsWidth = 20;
let numCellsHeight = 20;
let numSharks = 1;


let cellWidth;
let cellHeight;
let target;
let gravity;

function setup() {
  createCanvas(800, 600);

  colorMode(HSB);

  noStroke();

  cellWidth = width / numCellsWidth;
  cellHeight = height / numCellsHeight;

  let xoff = 0;
  let yoff = 0;
  let inc = 0.002; // very slow increment bc I want a small change (fish behavior)
  for (let xIndex = 0; xIndex < (numCellsWidth); xIndex++) {
    flowField[xIndex] = [];
    yoff = 0;
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      let angle = TWO_PI; //make fish go in same direction
      flowField[xIndex][yIndex] = new Cell(angle, xIndex, yIndex);
      yoff += inc;
    }
    xoff += inc;
  }
  
  target = createVector(width, height/2);
  for(let i = 0; i < numVehicles; i++) {
    vehicles.push(new Vehicle(random(width), random(height), target));
  }


  gravity  = createVector(0, -0.1)
  for (let i = 0; i < numSystems; i++) {
    systems.push(new ParticleSystem(random(100, width-200), height));
  }

 
}

function draw() {
  background(100);

  push();


  fill(197, 72, 70, 0.8);
  rect(0, 500, width, height/6);
  fill(191, 77, 81, 0.8);
  rect(0, 0, width, height);

  fill(34, 35, 91, 0.8);
  rect(0, 450, width, 500);
  

  pop();

  target.x = mouseX; 
  target.y = mouseY;

  //ellipse(target.x, target.y, 10, 10);

  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      flowField[xIndex][yIndex].update();
      flowField[xIndex][yIndex].show();
    }
  }

  for (let vehicle of vehicles) {
    vehicle.update();
    vehicle.show();
  }

  for (let shark of sharks) {
    shark.update();
    shark.show();
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

function mousePressed() {

  target = createVector (width/4, height/2)
  for (let i = 0; i < numSharks; i++) {
    sharks.push(shark = new Shark(mouseX, mouseY, target));
  }
  // let arrayIndeces = positionToFlowFieldIndex(mouseX, mouseY);
  // let angle = flowField[arrayIndeces.x][arrayIndeces.y].angle;
  // let vel = p5.Vector.fromAngle(angle);
  // shark.vel = vel;
  // sharks.push(shark);
}
