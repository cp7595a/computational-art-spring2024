let systems = [];
let sharks = [];
let flowField = [];
let vehicles = [];

let numVehicles = 15;
let numSystems = 10; 
let numCellsWidth = 20;
let numCellsHeight = 20;
// let numSharks = 1;


let cellWidth;
let cellHeight;
let target;
let gravity;
let destroy;

function setup() {
  createCanvas(1200, 600);

  colorMode(HSB);
  noStroke();

  let destroy = false;

  cellWidth = width / numCellsWidth;
  cellHeight = height / numCellsHeight;

  let xoff = 0;
  let yoff = 0;
  let inc = 0.2;
  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    flowField[xIndex] = [];
    yoff = 0;
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      let angle = map(noise(xoff, yoff), 0, 1, 0, 2 * PI);
      flowField[xIndex][yIndex] = new Cell(angle, xIndex, yIndex);
      yoff += inc;
    }
    xoff += inc;
  }
  

  
  target = createVector(width/4, height/2);
  for(let i = 0; i < numVehicles; i++) {
    vehicles.push(new Fish(random(width), random(height), target));
  }

  gravity  = createVector(0, -0.1)
  for (let i = 0; i < numSystems; i++) {
    systems.push(new ParticleSystem(random(100, width-200), 600, gravity));
  }
  

  // gravity2  = createVector(0, 0.1)
  // for (let i = 0; i < numSystems; i++) {
  //   systems.push(new ParticleSystem(random(100, width-200), 600, gravity2));
  // }
}

function draw() {
  background(0, 0, 100);



  push();
  fill(191, 77, 81, 0.8);
  rect(0, 0, width, height);

  pop();

  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      flowField[xIndex][yIndex].update();
      flowField[xIndex][yIndex].show();
    }
  }

  fill(197, 72, 70, 0.9);
  rect(0, 500, width, height/6);
  fill(34, 35, 91, 0.9);
  rect(0, 450, width, 500);




  for (let vehicle of vehicles) {
    vehicle.update();
    vehicle.show();
  }

  for (let ps of systems) {
    ps.update();
  }

}

